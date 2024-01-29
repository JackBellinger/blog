use crate::{app::ApiContext, utils::workspace::get_project_root};
use axum::{extract::Query, http::StatusCode, response::IntoResponse, routing::get, Extension, Router};
use chrono::serde::ts_milliseconds;
use serde::{Deserialize, Deserializer, Serialize};
use sqlx::{
	types::chrono::{DateTime, Utc},
	FromRow, QueryBuilder, Sqlite,
};
use tower_http::services::{ServeDir, ServeFile};

fn tags_deserialize<'de, D>(deserializer: D) -> Result<Vec<String>, D::Error>
where
	D: Deserializer<'de>,
{
	let str_sequence = String::deserialize(deserializer)?;
	Ok(str_sequence.split(',').map(|item| item.trim().to_owned()).collect())
}

// Query params for blogs, paginated and filtered by tag and title partial match
#[derive(Deserialize, Debug)]
struct BlogSearch {
	#[serde(default)]
	title: String,
	#[serde(default, deserialize_with = "tags_deserialize")]
	tags: Vec<String>,
	page: i32,
	per_page: i32,
}

#[derive(Debug, Clone, Eq, PartialEq, Hash, FromRow, Serialize)]
pub struct Blog {
	// id: i32,
	slug: String,
	title: String,
	#[sqlx(default)]
	tags: String,
	excerpt: String,
	#[serde(with = "ts_milliseconds")]
	timestamp: DateTime<Utc>,
	#[serde(with = "ts_milliseconds")]
	updated: DateTime<Utc>,
	hidden: bool,
	coverImage: String,
}

async fn blogs_meta_show(
	ctx: Extension<ApiContext>,
	blog_query: Query<BlogSearch>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
	let blog_search: BlogSearch = blog_query.0;
	tracing::debug!(
		"Getting blogs matching: title contains: {:#?}, and tags contain: {:#?}",
		blog_search.title.trim(),
		blog_search.tags
	);
	let mut transaction = ctx.db.begin().await.ok().unwrap();
	let mut query_builder: QueryBuilder<Sqlite> = QueryBuilder::new("");
	query_builder.push(
		"SELECT blogs.id, slug, title, group_concat(tags.name, ',') as tags, excerpt, timestamp, updated, hidden, coverImage 
		FROM blogs 
		JOIN blogs_tags on blogs_tags.blog_id = blogs.id
		JOIN tags ON tags.id = blogs_tags.tag_id
		where not hidden
	",
	);
	if !blog_search.title.is_empty() {
		tracing::debug!("title not empty: {:#?}", blog_search.title);
		let title = format!("%{}%", blog_search.title.trim());
		// query_builder.push(" AND title LIKE '%");
		query_builder.push(" AND title LIKE ");
		query_builder.push_bind(title);
		// query_builder.push("%' ");
	}
	if !(blog_search.tags.is_empty()
		|| (blog_search.tags.len() == 1 && blog_search.tags.first().expect("no first").eq_ignore_ascii_case("")))
	{
		tracing::debug!("tags not empty: {:#?}", blog_search.tags);
		query_builder.push(
			r#"
			AND tags.id IN (
				SELECT blog_id
				FROM blogs_tags
				JOIN tags ON tags.id = blogs_tags.tag_id
				WHERE tags.name IN (
			"#,
		);
		let mut separated = query_builder.separated(", ");
		for tag in blog_search.tags.iter() {
			separated.push_bind(tag);
		}
		separated.push_unseparated(") )");
	}
	query_builder.push(" GROUP BY blogs.id ORDER BY timestamp DESC LIMIT ");
	query_builder.push_bind(blog_search.per_page);
	query_builder.push(" OFFSET ");
	query_builder.push_bind(blog_search.page * blog_search.per_page);

	let query = query_builder.build_query_as::<Blog>();
	let response = query
		.fetch_all(&mut *transaction)
		.await
		.map(|s| {
			tracing::debug!("{:#?}", s);
			s
		})
		.map(axum::Json)
		.map_err(|e: sqlx::Error| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()));
	match transaction.commit().await {
		Ok(_) => {
			tracing::debug!("returned blogs successfully");
		}
		Err(e) => {
			tracing::error!("unable to query blogs b/c error: {}", e);
			return Err((StatusCode::INTERNAL_SERVER_ERROR, "Unable to query blogs".to_string()));
		}
	};
	response
}

#[derive(Debug, Clone, Eq, PartialEq, Hash, FromRow, Serialize)]
pub struct Tag {
	// id: i32,
	name: String,
}

async fn tags_show(ctx: Extension<ApiContext>) -> Result<impl IntoResponse, (StatusCode, String)> {
	tracing::debug!("Getting tags");
	let mut transaction = ctx.db.begin().await.ok().unwrap();
	let mut query_builder: QueryBuilder<Sqlite> = QueryBuilder::new("");
	query_builder.push(
		"SELECT tags.name
		FROM tags
		INNER JOIN blogs_tags ON tags.id = blogs_tags.tag_id
		INNER JOIN blogs ON blogs_tags.blog_id = blogs.id
		WHERE blogs.hidden = FALSE
		GROUP BY tags.name;
		",
	);
	let query = query_builder.build_query_as::<Tag>();
	let response = query
		.fetch_all(&mut *transaction)
		.await
		.map(axum::Json)
		.map(|s| {
			tracing::debug!("{:#?}", s);
			s
		})
		.map_err(|e: sqlx::Error| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()));
	match transaction.commit().await {
		Ok(_) => {
			tracing::debug!("returned tags successfully");
		}
		Err(e) => {
			tracing::error!("Unable to query tags b/c error: {}", e);
			return Err((StatusCode::INTERNAL_SERVER_ERROR, "Unable to query tags".to_string()));
		}
	};
	response
}

const ARTICLES_DIR: &str = "./svelte_front/dist/assets/md_html";
pub fn route_article_files() -> Router {
	let mut articles_dir = get_project_root().unwrap();
	articles_dir.push(ARTICLES_DIR);
	//and add the 404 page as a fallback
	let mut a_404_path = articles_dir.clone();
	a_404_path.push("404.html");
	tracing::info!(
		"articles_dir: {:?}, 404 path: {:?}",
		&articles_dir.clone().into_os_string(),
		a_404_path
	);
	let serve_articles_dir = ServeDir::new(articles_dir)
		.append_index_html_on_directories(true)
		.not_found_service(ServeFile::new(a_404_path));

	Router::new().nest_service("/articles", serve_articles_dir)
}
pub fn route_gets() -> Router<()> {
	Router::new()
		.route("/blogs", get(blogs_meta_show))
		.route("/tags", get(tags_show))
		.merge(route_article_files())
}
// async fn blog_create(ctx: Extension<ApiContext>, form: Form<Blog>) -> Result<impl IntoResponse, (StatusCode, String)>
// { 	// tracing::info!("Posting comment on blog#{}", blog_slug);
// 	let blog = form.0;
// 	let blogcl = blog.clone();
// 	let mut transaction = ctx.db.begin().await.ok().unwrap();

// 	let username = blog.username;
// 	let reply_to = blog.reply_to;
// 	let text = blog.text;

// 	let query_result1 = sqlx::query!(
// 		r#"
// 			INSERT INTO blogs (user_id, reply_to, timestamp, text)
// 			VALUES ((SELECT id FROM users WHERE users.username = $1), $2, CURRENT_TIMESTAMP, $3);
// 		"#,
// 		username,
// 		reply_to,
// 		text
// 	)
// 	// id integer PRIMARY KEY autoincrement,
// 	//  slug varchar(20) NOT NULL,
// 	//  title VARCHAR(255) NOT NULL,
// 	//  excerpt TEXT NOT NULL,
// 	//  timestamp DATETIME NOT NULL,
// 	//  updated DATETIME NOT NULL,
// 	//  hidden BOOLEAN NOT NULL DEFAULT FALSE -- uri varchar(100) NOT NULL
// 	.execute(&mut *transaction)
// 	.await
// 	.ok()
// 	.unwrap();
// 	let comment_id = query_result1.last_insert_rowid();
// 	let mut rows_affected = query_result1.rows_affected();

// 	let query_result2 = sqlx::query!(
// 		r#"
// 			INSERT INTO blogs_comments (blog_id, comment_id)
// 			VALUES ((SELECT id FROM blogs WHERE blogs.slug = $1), $2);
// 		"#,
// 		blog_slug,
// 		comment_id
// 	)
// 	.execute(&mut *transaction)
// 	.await
// 	.ok()
// 	.unwrap();
// 	rows_affected += query_result2.rows_affected();

// 	match transaction.commit().await {
// 		Ok(_) => {
// 			tracing::debug!("posted {}'s comment successfully", commentcl.username);
// 			match rows_affected {
// 				2 => Ok(Json("Your comment was successfully posted.")),
// 				0 => Err((StatusCode::BAD_REQUEST, "Failed to post comment.".to_string())),
// 				_ => Err((
// 					StatusCode::INTERNAL_SERVER_ERROR,
// 					"Error: Unexpected number of rows.".to_string(),
// 				)),
// 			}
// 		}
// 		Err(e) => {
// 			tracing::error!("unable to post comment: {:#?} b/c error: {}", commentcl, e);
// 			Err((
// 				StatusCode::INTERNAL_SERVER_ERROR,
// 				"Posting comment had no result".to_string(),
// 			))
// 		}
// 	}
// 	// Ok(Json(json!("ok ")))
// }

// pub fn route_posts() -> Router<()> {
// 	Router::new()
// 		.route("/comments/blog/:blog_slug", post(blog_create))
// 		.route_layer(permission_required!(
// 			AuthBackend,
// 			login_url = "/login",
// 			"protected.write",
// 		))
// }
