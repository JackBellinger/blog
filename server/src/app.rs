use crate::{
	auth::{self, users::AuthBackend},
	routes::{backend, frontend},
};
use axum::{error_handling::HandleErrorLayer, http::StatusCode, middleware, BoxError, Router};
use axum_login::{
	tower_sessions::{Expiry, MemoryStore, SessionManagerLayer},
	AuthManagerLayerBuilder,
};
use log::LevelFilter;
use sqlx::{pool::PoolOptions, sqlite::SqliteConnectOptions, ConnectOptions, Sqlite, SqlitePool};
use std::net::SocketAddr;
use tower::ServiceBuilder;
use tower_http::{add_extension::AddExtensionLayer, trace::TraceLayer};
use tower_sessions::cookie::time::Duration;

pub struct App {
	db: SqlitePool,
}

#[derive(Clone, Debug)]
pub struct ApiContext {
	// config: Arc<Config>,
	pub db: SqlitePool,
}

impl App {
	pub async fn new() -> Result<Self, Box<dyn std::error::Error>> {
		// let db_opts = PoolOptions::<Sqlite>::new();
		let mut sqlite_opts: SqliteConnectOptions = "./db/blog.db".parse()?;
		sqlite_opts = sqlite_opts.log_statements(LevelFilter::Debug);
		let db = SqlitePool::connect_with(sqlite_opts).await?;
		// sqlx::migrate!().run(&db).await?;
		Ok(Self { db })
	}

	pub async fn serve(self, addr: SocketAddr) -> Result<(), Box<dyn std::error::Error>> {
		// Session layer.
		//
		// This uses `tower-sessions` to establish a layer that will provide the session
		// as a request extension.
		let session_store = MemoryStore::default();
		let session_layer = SessionManagerLayer::new(session_store.clone())
			.with_secure(false)
			.with_expiry(Expiry::OnInactivity(Duration::days(1)));
		// Auth service.
		//
		// This combines the session layer with our backend to establish the auth
		// service which will provide the auth session as a request extension.
		let auth_backend = AuthBackend::new(self.db.clone());
		let auth_service = ServiceBuilder::new()
			.layer(HandleErrorLayer::new(|_: BoxError| async { StatusCode::BAD_REQUEST }))
			.layer(AuthManagerLayerBuilder::new(auth_backend, session_layer).build());

		let trace_layer = TraceLayer::new_for_http()
			.make_span_with(trace_layer::trace_layer_make_span_with)
			.on_request(trace_layer::trace_layer_on_request)
			.on_response(trace_layer::trace_layer_on_response);

		let app = Router::new()
			// === Must be logged into a superuser account ===
			// === Must be logged in ===
			// === Public routes ===
			.merge(auth::login::router())
			.merge(backend::router())
			.merge(frontend::router())
			.layer(AddExtensionLayer::new(ApiContext { db: self.db.clone() }))
			.layer(auth_service)
			.layer(middleware::from_fn(print_request_body))
			.layer(trace_layer);

		let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
		tracing::info!("listening on http://{}", addr);
		axum::serve(listener, app.into_make_service_with_connect_info::<SocketAddr>()).await?;

		Ok(())
	}
}
use axum::{
	async_trait,
	body::{Body, Bytes},
	extract::{FromRequest, Request},
	middleware::Next,
	response::{IntoResponse, Response},
};
use http_body_util::BodyExt;
// middleware that shows how to consume the request body upfront
async fn print_request_body(request: Request, next: Next) -> Result<impl IntoResponse, Response> {
	let request = buffer_request_body(request).await?;

	Ok(next.run(request).await)
}

// the trick is to take the request apart, buffer the body, do what you need to do, then put
// the request back together
async fn buffer_request_body(request: Request) -> Result<Request, Response> {
	let (parts, body) = request.into_parts();

	// this wont work if the body is an long running stream
	let bytes = body
		.collect()
		.await
		.map_err(|err| (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()).into_response())?
		.to_bytes();

	do_thing_with_request_body(bytes.clone());

	Ok(Request::from_parts(parts, Body::from(bytes)))
}

fn do_thing_with_request_body(bytes: Bytes) {
	tracing::debug!(body = ?bytes);
}

// async fn handler(BufferRequestBody(body): BufferRequestBody) {
// 	tracing::debug!(?body, "handler received body");
// }

// extractor that shows how to consume the request body upfront
struct BufferRequestBody(Bytes);

// we must implement `FromRequest` (and not `FromRequestParts`) to consume the body
#[async_trait]
impl<S> FromRequest<S> for BufferRequestBody
where
	S: Send + Sync,
{
	type Rejection = Response;

	async fn from_request(req: Request, state: &S) -> Result<Self, Self::Rejection> {
		let body = Bytes::from_request(req, state)
			.await
			.map_err(|err| err.into_response())?;

		do_thing_with_request_body(body.clone());

		Ok(Self(body))
	}
}

mod trace_layer {
	use axum::{body::Body, extract::ConnectInfo, http::Request, response::Response};
	use std::{net::SocketAddr, time::Duration};
	use tracing::Span;

	pub(crate) fn trace_layer_make_span_with(request: &Request<Body>) -> Span {
		tracing::error_span!("request",
			uri = %request.uri(),
			method = %request.method(),
			// This is not particularly robust, but suitable for a demo
			// You'll need to change this if you deploy behind a proxy
			// (eg the `X-forwarded-for` header)
			source = request.extensions()
					.get::<ConnectInfo<SocketAddr>>()
					.map(|connect_info|
						tracing::field::display(connect_info.ip().to_string()),
					).unwrap_or_else(||
						tracing::field::display(String::from("<unknown>"))
					),
			// Fields must be defined to be used, define them as empty if they populate later
			status = tracing::field::Empty,
			latency = tracing::field::Empty,
		)
	}

	pub(crate) fn trace_layer_on_request(_request: &Request<Body>, _span: &Span) { tracing::trace!("Got request") }

	pub(crate) fn trace_layer_on_response(response: &Response<Body>, latency: Duration, span: &Span) {
		span.record("latency", tracing::field::display(format!("{}μs", latency.as_micros())));
		span.record("status", tracing::field::display(response.status()));
		tracing::trace!("Responded");
	}
}
