use crate::{utils::workspace::get_project_root, FRONT_SVELTE_PUBLIC, FRONT_YEW_PUBLIC};
use axum::{http::StatusCode, Router};
use tower_http::services::{ServeDir, ServeFile};

pub(crate) fn router() -> Router {
	// serve svelte blog from svelte_front directory
	let mut svelte_dir = get_project_root().unwrap();
	svelte_dir.push(FRONT_SVELTE_PUBLIC);
	//and add the 404 page as a fallback
	let mut svelte_404_path = svelte_dir.clone();
	svelte_404_path.push("404.html");
	tracing::info!(
		"serveDir: {:?}, 404 path: {:?}",
		&svelte_dir.clone().into_os_string(),
		svelte_404_path
	);
	let serve_dir_from_svelte = ServeDir::new(svelte_dir)
		.append_index_html_on_directories(true)
		.not_found_service(ServeFile::new(svelte_404_path));

	//serve yew example from yew_front directory
	let mut yew_dir = get_project_root().unwrap();
	yew_dir.push(FRONT_YEW_PUBLIC);
	let serve_dir_from_yew = ServeDir::new(yew_dir).append_index_html_on_directories(true);

	Router::new()
		.nest_service("/yew", serve_dir_from_yew)
		.nest_service("/blog", serve_dir_from_svelte)
}

#[allow(clippy::unused_async)]
async fn _handle_error() -> (StatusCode, &'static str) {
	(
		StatusCode::INTERNAL_SERVER_ERROR,
		"Eror 404: Something went wrong accessing static files...",
	)
}
