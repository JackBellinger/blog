use crate::auth::users::{AuthBackend, AuthSession};
use askama::Template;
use axum::{http::StatusCode, response::IntoResponse, routing::get, Router};
use axum_login::permission_required;

#[derive(Template)]
#[template(path = "protected.html")]
struct ProtectedTemplate<'a> {
	username: &'a str,
}

pub fn router() -> Router {
	Router::new()
		.route("/", get(self::get::protected))
		.route_layer(permission_required!(
			AuthBackend,
			login_url = "/login",
			"protected.read",
		))
}

mod get {
	use super::*;

	pub async fn protected(auth_session: AuthSession) -> impl IntoResponse {
		match auth_session.user {
			Some(user) => ProtectedTemplate {
				username: &user.username,
			}
			.into_response(),

			None => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
		}
	}
}
