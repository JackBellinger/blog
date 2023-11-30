// print out session

use axum::{response::IntoResponse, Json};
use serde_json::json;
use tower_sessions::Session;

/// output entire session object
pub fn handler(session: Session) -> impl IntoResponse {
	tracing::info!("Seeking session info");
	Json(json!({ "session": format!("{:?}", session) }))
}

/// output session data in json
pub fn data_handler(session: Session) -> impl IntoResponse {
	tracing::info!("Seeking session data");
	let user_id: String = session
		.get("user_id")
		.expect("Could not deserialize.")
		.unwrap_or_default();
	Json(json!({ "user_id": user_id }))
}
