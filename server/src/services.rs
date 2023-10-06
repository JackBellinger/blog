use axum::http::StatusCode;
#[allow(unused_imports)]
use axum::{
    body::Bytes,
    extract::MatchedPath,
    //handler::HandlerWithoutStateExt,
    http::{HeaderMap, Request},
    response::Response,
    middleware,
    response::IntoResponse,
    routing::{get, post},
    Router,
};
use axum_sessions::{async_session::SessionStore, SessionLayer};
use std::sync::Arc;
use tracing::Level;

use tower_http::{
    services::{ServeDir, ServeFile},
    trace::{TraceLayer, DefaultOnResponse, DefaultOnRequest, DefaultMakeSpan}, LatencyUnit,
};

use crate::{
    middlewares, routes,
    store::{self, Store},
    utils::workspace::get_project_root,
    FRONT_SVELTE_PUBLIC, FRONT_YEW_PUBLIC,
};

// *********
// FRONT END
// *********

pub(crate) fn two_serve_dirs() -> Router {
    // serve svelte blog from svelte_front directory
    let mut svelte_dir = get_project_root().unwrap();
    svelte_dir.push(FRONT_SVELTE_PUBLIC);
    //and add the 404 page as a fallback
    let mut svelte_404_path = svelte_dir.clone();
    svelte_404_path.push("404.html");
    tracing::info!("serveDir: {:?}, 404 path: {:?}", &svelte_dir.clone().into_os_string(), svelte_404_path);
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
    .layer(
        TraceLayer::new_for_http()
            .make_span_with(DefaultMakeSpan::new().include_headers(true))
            .on_request(DefaultOnRequest::new().level(Level::INFO))
            .on_response(
                DefaultOnResponse::new()
                    .level(Level::INFO)
                    .latency_unit(LatencyUnit::Micros),
            ),
    )
}

#[allow(clippy::unused_async)]
async fn _handle_error() -> (StatusCode, &'static str) {
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        "Eror 404: Something went wrong accessing static files...",
    )
}

// ********
// BACK END
// ********
// Back end server built form various routes that are either public, require auth, or secure login
pub fn backend<Store: SessionStore>(
    session_layer: SessionLayer<Store>,
    shared_state: Arc<store::Store>,
) -> Router {
    // could add tower::ServiceBuilder here to group layers, especially if you add more layers.
    // see https://docs.rs/axum/latest/axum/middleware/index.html#ordering
    Router::new()
        .merge(back_public_route())
        .merge(back_auth_route())
        .merge(back_token_route(shared_state))
        .layer(session_layer)
}

// *********
// BACKEND NON-AUTH
// *********
//
pub fn back_public_route() -> Router {
    Router::new()
        .route("/auth/session", get(routes::session::data_handler)) // gets session data
        .route("/auth/login", post(routes::login)) // sets username in session
        .route("/auth/logout", get(routes::logout)) // deletes username in session
        .route("/test", get(routes::not_implemented_route))
}

// *********
// BACKEND SESSION
// *********
//
pub fn back_auth_route() -> Router {
    Router::new()
        .route("/secure", get(routes::session::handler))
        .route_layer(middleware::from_fn(middlewares::user_secure))
}

// *********
// BACKEND API
// *********
//
// invoked with State that stores API that is checked by the `middleware::auth`
pub fn back_token_route<S>(state: Arc<Store>) -> Router<S> {
    Router::new()
        .route("/api", get(routes::api::handler))
        .route_layer(middleware::from_fn_with_state(
            state.clone(),
            middlewares::auth,
        ))
        .with_state(state)
}
#[allow(dead_code)]
async fn hello() -> impl IntoResponse {
    "This is an empty hello homepage!"
}
