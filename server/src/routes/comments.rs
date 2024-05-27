use crate::{app::ApiContext, auth::users::AuthBackend};
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
use sqlx::{
	types::chrono::{DateTime, Utc},
	FromRow, Sqlite,
};

// Path segment labels will be matched with struct field names
#[derive(Deserialize)]
struct BlogCommentsParams {
	blog_slug: String,
}
#[derive(Deserialize)]
struct UserCommentsParams {
	username: String,
}
#[derive(Deserialize)]
struct UpvoteCommentParams {
	comment_id: i32,
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
async fn users_comments_create(
	Path(UserCommentsParams { username }): Path<UserCommentsParams>,
	ctx: Extension<ApiContext>,
	form: Form<Comment>,
) -> impl IntoResponse {
	tracing::info!("Posting comment for user#{}", username);
	let comment = form.0;
	let commentcl = comment.clone();
	let mut transaction = ctx.db.begin().await.ok().unwrap();

	let username = comment.username;
	let reply_to = comment.reply_to;
	let text = comment.text;

	let query_result1 = sqlx::query!(
		r#"
			INSERT INTO comments (user_id, reply_to, timestamp, text)
			VALUES ((SELECT id FROM users WHERE users.username = $1), $2, CURRENT_TIMESTAMP, $3);
		"#,
		username,
		reply_to,
		text
	)
	.execute(&mut *transaction)
	.await
	.ok()
	.unwrap();
	let rows_affected = query_result1.rows_affected();

	match transaction.commit().await {
		Ok(_) => {
			tracing::debug!("posted {}'s comment successfully", commentcl.username);
			match rows_affected {
				1 => Ok(Json("Your comment was successfully posted.")),
				0 => Err((StatusCode::BAD_REQUEST, "Failed to post comment.".to_string())),
				_ => Err((
					StatusCode::INTERNAL_SERVER_ERROR,
					"Error: Unexpected number of rows.".to_string(),
				)),
			}
		}
		Err(e) => {
			tracing::error!("unable to post comment: {:#?} b/c error: {}", commentcl, e);
			Err((
				StatusCode::INTERNAL_SERVER_ERROR,
				"Posting comment had no result".to_string(),
			))
		}
	}
	// Ok(Json(json!("ok ")))
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
	let commentcl = comment.clone();
	let mut transaction = ctx.db.begin().await.ok().unwrap();

	let username = comment.username;
	let reply_to = comment.reply_to;
	let text = comment.text;

	let query_result1 = sqlx::query!(
		r#"
			INSERT INTO comments (user_id, reply_to, timestamp, text)
			VALUES ((SELECT id FROM users WHERE users.username = $1), $2, CURRENT_TIMESTAMP, $3);
		"#,
		username,
		reply_to,
		text
	)
	.execute(&mut *transaction)
	.await
	.ok()
	.unwrap();
	let comment_id = query_result1.last_insert_rowid();
	let mut rows_affected = query_result1.rows_affected();

	let query_result2 = sqlx::query!(
		r#"
			INSERT INTO blogs_comments (blog_id, comment_id)
			VALUES ((SELECT id FROM blogs WHERE blogs.slug = $1), $2);
		"#,
		blog_slug,
		comment_id
	)
	.execute(&mut *transaction)
	.await
	.ok()
	.unwrap();
	rows_affected += query_result2.rows_affected();

	match transaction.commit().await {
		Ok(_) => {
			tracing::debug!("posted {}'s comment successfully", commentcl.username);
			match rows_affected {
				2 => Ok(Json("Your comment was successfully posted.")),
				0 => Err((StatusCode::BAD_REQUEST, "Failed to post comment.".to_string())),
				_ => Err((
					StatusCode::INTERNAL_SERVER_ERROR,
					"Error: Unexpected number of rows.".to_string(),
				)),
			}
		}
		Err(e) => {
			tracing::error!("unable to post comment: {:#?} b/c error: {}", commentcl, e);
			Err((
				StatusCode::INTERNAL_SERVER_ERROR,
				"Posting comment had no result".to_string(),
			))
		}
	}
	// Ok(Json(json!("ok ")))
}

fn transaction_err(
	e: sqlx::Error,
) -> Result<sqlx::Transaction<'static, Sqlite>, (axum::http::StatusCode, std::string::String)> {
	tracing::error!("Failed to begin transaction for upvoting comment");
	Err((StatusCode::INTERNAL_SERVER_ERROR, format!("Transaction error: {}", e)))
}

async fn upvote_comment(
	Path(UpvoteCommentParams { comment_id }): Path<UpvoteCommentParams>,
	ctx: Extension<ApiContext>,
) -> impl IntoResponse {
	tracing::info!("Upvoting comment#{}", comment_id);

	let mut transaction = ctx.db.begin().await.or_else(transaction_err)?;

	let query_result = sqlx::query!(
		r#"
		 UPDATE comments
		 SET upvotes = upvotes + 1
		 WHERE id = $1
		 "#,
		comment_id
	)
	.execute(&mut *transaction)
	.await;

	let result = match query_result {
		Ok(result) => {
			if result.rows_affected() == 1 {
				tracing::debug!("Upvoted comment#{} successfully", comment_id);
				Ok(Json("Your comment was successfully upvoted."))
			} else {
				tracing::warn!("No comment found with id: {}", comment_id);
				Err((StatusCode::BAD_REQUEST, "Comment not found.".to_string()))
			}
		}
		Err(e) => {
			tracing::error!("Error upvoting comment: {}", e);
			Err((
				StatusCode::INTERNAL_SERVER_ERROR,
				"Failed to upvote comment.".to_string(),
			))
		}
	};

	match transaction.commit().await {
		Ok(_) => result,
		Err(e) => {
			tracing::error!("Failed to commit transaction: {}", e);
			Err((
				StatusCode::INTERNAL_SERVER_ERROR,
				"Upvoting comment had no result".to_string(),
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
		.route("/comments/user/:username", post(users_comments_create))
		.route("/comments/blog/:blog_slug", post(blog_comments_create))
		.route("/comments/upvote/:comment_id", post(upvote_comment))
		.route_layer(permission_required!(
			AuthBackend,
			login_url = "/login",
			"protected.read",
		))
}
