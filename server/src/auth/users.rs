use async_trait::async_trait;
use axum_login::{AuthUser, AuthnBackend, AuthzBackend, UserId};
use password_auth::verify_password;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, SqlitePool};
use std::collections::HashSet;

#[derive(Clone, Serialize, Deserialize, FromRow)]
pub struct User {
	id: i64,
	pub username: String,
	password_hash: String,
}

// Here we've implemented `Debug` manually to avoid accidentally logging the
// password hash.
impl std::fmt::Debug for User {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		f.debug_struct("User")
			.field("id", &self.id)
			.field("username", &self.username)
			.field("password", &"[redacted]")
			.finish()
	}
}

impl AuthUser for User {
	type Id = i64;

	fn id(&self) -> Self::Id { self.id }

	fn session_auth_hash(&self) -> &[u8] {
		self.password_hash.as_bytes() // We use the password hash as the auth
	}
}

#[derive(Debug, Clone, Deserialize)]
pub struct Credentials {
	pub username: String,
	pub password: String,
	pub next: Option<String>,
}

#[derive(Debug, Clone)]
pub struct AuthBackend {
	db: SqlitePool,
}

impl AuthBackend {
	pub fn new(db: SqlitePool) -> Self { Self { db } }
}

#[async_trait]
impl AuthnBackend for AuthBackend {
	type User = User;
	type Credentials = Credentials;
	type Error = sqlx::Error;

	async fn authenticate(&self, creds: Self::Credentials) -> Result<Option<Self::User>, Self::Error> {
		let user: Option<Self::User> = sqlx::query_as("select * from users where username = ? ")
			.bind(creds.username)
			.fetch_optional(&self.db)
			.await?;

		Ok(user.filter(|user| {
			verify_password(creds.password, &user.password_hash).ok().is_some()
			// auth by comparing our form input with an argon2 password hash.
		}))
	}

	async fn get_user(&self, user_id: &UserId<Self>) -> Result<Option<Self::User>, Self::Error> {
		let user = sqlx::query_as("select * from users where id = ?")
			.bind(user_id)
			.fetch_optional(&self.db)
			.await?;
		tracing::debug!("found user = {:#?}", user);
		Ok(user)
	}
}

#[derive(Debug, Clone, Eq, PartialEq, Hash, FromRow)]
pub struct Permission {
	pub name: String,
}

impl From<&str> for Permission {
	fn from(name: &str) -> Self { Permission { name: name.to_string() } }
}

#[async_trait]
impl AuthzBackend for AuthBackend {
	type Permission = Permission;

	async fn get_group_permissions(&self, user: &Self::User) -> Result<HashSet<Self::Permission>, Self::Error> {
		let permissions: Vec<Self::Permission> = sqlx::query_as(
			r#"
            select distinct permissions.name
            from users
            join users_groups on users.id = users_groups.user_id
            join groups_permissions on users_groups.group_id = groups_permissions.group_id
            join permissions on groups_permissions.permission_id = permissions.id
            where users.id = ?
            "#,
		)
		.bind(user.id)
		.fetch_all(&self.db)
		.await?;

		Ok(permissions.into_iter().collect())
	}
}

// We use a type alias for convenience.
//
// Note that we've supplied our concrete AuthBackend here.
pub type AuthSession = axum_login::AuthSession<AuthBackend>;
