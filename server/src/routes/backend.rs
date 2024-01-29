use super::{protected, restricted, session};
use crate::routes::{blogs, comments};
use axum::Router;
pub(crate) fn router() -> Router { Router::new().nest("/api", blog_routes()) }

fn blog_routes() -> Router {
	Router::new()
		.merge(blogs::route_gets())
		.merge(comments::route_gets())
		.merge(comments::route_posts())
		.merge(restricted::router())
		.merge(protected::router())
		.merge(session::router())
}
