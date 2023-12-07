use super::app::ApiContext;
use crate::auth::users::AuthBackend;
use axum::{
	extract::Path,
	http::StatusCode,
	response::IntoResponse,
	routing::{get, post},
	Extension, Form, Json, Router,
};
use axum_login::permission_required;
use chrono::serde::ts_milliseconds;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{
	types::chrono::{DateTime, Utc},
	FromRow, Sqlite,
};
use std::str::FromStr;

// Path segment labels will be matched with struct field names
#[derive(Deserialize)]
struct BlogCommentsParams {
	blog_slug: String,
}
#[derive(Deserialize)]
struct UserCommentsParams {
	username: String,
}
#[derive(Debug, Clone, Eq, PartialEq, Hash, FromRow, Serialize, Deserialize)]
pub struct Comment {
	id: i32,
	username: String,
	reply_to: i32,
	#[serde(with = "ts_milliseconds")]
	timestamp: DateTime<Utc>,
	upvotes: i32,
	hidden: bool,
	text: String,
}
// Frontend comment type
// 	id: number;
// 	username: string;
// 	reply_to: number;
// 	timestamp: Date;
// 	upvotes: number;
// 	hidden: boolean;
// 	text: string;

async fn users_comments_show(
	Path(UserCommentsParams { username }): Path<UserCommentsParams>,
	ctx: Extension<ApiContext>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
	tracing::info!("Getting comments for user#{}", username);
	sqlx::query_as::<Sqlite, Comment>(
		r#"
			select comments.id, username, reply_to, timestamp, upvotes, hidden, text
			from comments
			join users on comments.user_id = users.id
			where users.username = ?
		"#,
	)
	.bind(username)
	.fetch_all(&ctx.db)
	.await
	.map(axum::Json)
	.map_err(|e: sqlx::Error| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))
}
async fn users_comments_create(Path(UserCommentsParams { username }): Path<UserCommentsParams>) -> impl IntoResponse {
	tracing::info!("Posting comment for user#{}", username);
	Json(json!({"result": "ok", "message": "You've reached the backend API by using a valid token."}))
}
async fn blog_comments_show(
	Path(BlogCommentsParams { blog_slug }): Path<BlogCommentsParams>,
	ctx: Extension<ApiContext>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
	tracing::debug!("Getting comments for blog#{} with context: {:#?}", blog_slug, ctx);
	sqlx::query_as::<Sqlite, Comment>(
		r#"
			select comments.id, username, reply_to, comments.timestamp, upvotes, comments.hidden, comments.text
			from blogs
			join blogs_comments on blogs.id = blogs_comments.blog_id
			join comments on comment_id = comments.id
			join users on comments.user_id = users.id
			where blogs.slug = ?
		"#,
	)
	.bind(blog_slug)
	.fetch_all(&ctx.db)
	.await
	.map(|comment| {
		tracing::debug!("comment: {:#?}", comment);
		comment
	})
	.map(axum::Json)
	.map_err(|e: sqlx::Error| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))
}
async fn blog_comments_create(
	Path(BlogCommentsParams { blog_slug }): Path<BlogCommentsParams>,
	ctx: Extension<ApiContext>,
	form: Form<Comment>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
	tracing::info!("Posting comment on blog#{}", blog_slug);
	let comment = form.0;
	tracing::debug!("got blog post: {:#?}", comment);
	let query = r#"
		INSERT INTO comments (user_id, reply_to, timestamp, text)
		VALUES ((SELECT id FROM users WHERE users.username = $1), $3, CURRENT_TIMESTAMP, $4);

		INSERT INTO blogs_comments (blog_id, comment_id)
		VALUES ((SELECT id FROM blogs WHERE blogs.slug = $2), last_insert_rowid());
	"#;
	let commentcl = comment.clone();
	let query_result = sqlx::query(query)
		.bind(comment.username)
		.bind(blog_slug)
		.bind(comment.reply_to)
		.bind(comment.text)
		.execute(&ctx.db)
		.await;
	match query_result {
		Ok(query_res) => {
			tracing::debug!("posted {}'s comment successfully", commentcl.username);
			match query_res.rows_affected() {
				2 => Ok(Json("Your comment was successfully posted.")),
				0 => Err((StatusCode::BAD_REQUEST, "Failed to post comment.".to_string())),
				_ => Err((
					StatusCode::INTERNAL_SERVER_ERROR,
					"Error: Unexpected number of rows.".to_string(),
				)),
			}
		}
		Err(e) => {
			tracing::debug!("unable to post comment: {:#?} b/c error: {}", commentcl, e);
			Err((
				StatusCode::INTERNAL_SERVER_ERROR,
				"Posting comment had no result".to_string(),
			))
		}
	}
}

pub fn route_gets() -> Router<()> {
	Router::new()
		.route("/comments/blog/:blog_slug", get(blog_comments_show))
		.route("/comments/user/:username", get(users_comments_show))
}

pub fn route_posts() -> Router<()> {
	Router::new()
		.route("/comments/blog/:blog_slug", post(blog_comments_create))
		.route("/comments/user/:username", post(users_comments_create))
		.route_layer(permission_required!(
			AuthBackend,
			login_url = "/login",
			"protected.read",
		))
}
