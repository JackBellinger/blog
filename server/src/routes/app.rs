use std::net::SocketAddr;

use axum::{error_handling::HandleErrorLayer, http::StatusCode, BoxError};
use axum_login::{
	tower_sessions::{Expiry, MemoryStore, SessionManagerLayer},
	AuthManagerLayerBuilder, permission_required,
};
use sqlx::SqlitePool;
use tower::ServiceBuilder;
use tower_sessions::cookie::time::Duration;

use crate::{
	routes::frontend,
	auth::{users::AuthBackend, self}
};

use super::{protected, restricted};

pub struct App {
	db: SqlitePool,
}

impl App {
	pub async fn new() -> Result<Self, Box<dyn std::error::Error>> {
		 let db = SqlitePool::connect(":memory:").await?;
		 sqlx::migrate!().run(&db).await?;

		 Ok(Self { db })
	}

	pub async fn serve(self, addr: SocketAddr) -> Result<(), Box<dyn std::error::Error>> {
		// Session layer.
		//
		// This uses `tower-sessions` to establish a layer that will provide the session
		// as a request extension.
		let session_store = MemoryStore::default();
		let session_layer = SessionManagerLayer::new(session_store)
			 .with_secure(false)
			 .with_expiry(Expiry::OnInactivity(Duration::days(1)));

		// Auth service.
		//
		// This combines the session layer with our backend to establish the auth
		// service which will provide the auth session as a request extension.
		let auth_backend = AuthBackend::new(self.db);
		let auth_service = ServiceBuilder::new()
			.layer(HandleErrorLayer::new(|_: BoxError| async {
				StatusCode::BAD_REQUEST
			}))
			.layer(AuthManagerLayerBuilder::new(auth_backend, session_layer).build());

		let app = restricted::router()
			.route_layer(permission_required!(
				AuthBackend,
				login_url = "/login",
				"restricted.read",
			))
			.merge(protected::router())
			.route_layer(permission_required!(
				AuthBackend,
				login_url = "/login",
				"protected.read",
			))
			.merge(auth::login::router())
			.merge(frontend::router())
			.layer(auth_service);


		let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
		tracing::info!("listening on http://{}", addr);
		axum::serve(listener, app.into_make_service()).await?;

		Ok(())



	// axum::Server::bind(&addr)
	// 	.serve(app.into_make_service())
	// 	.with_graceful_shutdown(shutdown_signal())
	// 	.await
	// 	.unwrap();
	//// Tokio signal handler that will wait for a user to press CTRL+C.
	//// We use this in our `Server` method `with_graceful_shutdown`.
	// async fn shutdown_signal() {
	// 	tokio::signal::ctrl_c()
	// 		.await
	// 		.expect("Expect shutdown signal handler");
	// 	println!("signal shutdown");
	// }
  }
}

