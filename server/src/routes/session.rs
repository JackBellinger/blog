// print out session
use crate::auth::users::{AuthBackend, AuthSession};
use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use axum_login::permission_required;
use serde_json::json;

pub fn router() -> Router {
	Router::new()
		.route("/session", get(self::get::session))
		.route_layer(permission_required!(
			AuthBackend,
			login_url = "/login",
			"protected.read",
		))
}
mod get {
	use super::*;

	pub async fn session(auth_session: AuthSession) -> impl IntoResponse {
		match auth_session.user {
			Some(user) => Json(json!({ "user": format!("{:?}", user.username) })).into_response(),
			None => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
		}
	}
}
