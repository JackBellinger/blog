// print out session
use crate::auth::users::AuthSession;
use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Serialize;
use serde_json::json;

#[allow(dead_code)]
#[derive(Debug, Serialize)]
struct Session {
	username: String,
}

pub fn router() -> Router { Router::new().route("/session", get(self::get::session)) }
mod get {
	use super::*;

	pub async fn session(auth_session: AuthSession) -> impl IntoResponse {
		match auth_session.user {
			Some(user) => Json(json!(Session {
				username: user.username
			}))
			.into_response(),
			None => StatusCode::UNAUTHORIZED.into_response(),
		}
	}
}
