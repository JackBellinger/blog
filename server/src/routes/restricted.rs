use crate::auth::users::{AuthBackend, AuthSession};
use askama::Template;
use axum::{http::StatusCode, response::IntoResponse, routing::get, Router};
use axum_login::permission_required;

#[derive(Template)]
#[template(path = "restricted.html")]
struct RestrictedTemplate<'a> {
	username: &'a str,
}

pub fn router() -> Router {
	Router::new()
		.route("/restricted", get(self::get::restricted))
		.route_layer(permission_required!(
			AuthBackend,
			login_url = "/login",
			"restricted.read",
		))
}

mod get {
	use super::*;

	pub async fn restricted(auth_session: AuthSession) -> impl IntoResponse {
		match auth_session.user {
			Some(user) => RestrictedTemplate {
				username: &user.username,
			}
			.into_response(),

			None => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
		}
	}
}
