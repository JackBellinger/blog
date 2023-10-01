use axum::Router;
use axum_sessions::{async_session::MemoryStore, SessionLayer};
use clap::Parser;
use tracing_subscriber::EnvFilter;
use tracing_subscriber::prelude::__tracing_subscriber_SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;
use std::net::{IpAddr, Ipv6Addr, SocketAddr};
use std::str::FromStr;
use std::sync::Arc;

pub mod routes;
mod services;
mod store;
mod middlewares;
mod utils {
    pub mod workspace;
}

// SETUP Constants
const SESSION_COOKIE_NAME: &str = "axum_svelte_session";
const FRONT_SVELTE_PUBLIC: &str = "./svelte_front/dist";
const FRONT_YEW_PUBLIC: &str = "./yew_front/dist";

// Setup the command line interface with clap.
#[derive(Parser, Debug)]
#[clap(name = "server", about = "A server for our wasm project!")]
struct Opt {
    /// set the log level
    #[clap(short = 'l', long = "log", default_value = "debug")]
    log_level: String,

    /// set the listen addr
    #[clap(short = 'a', long = "addr", default_value = "localhost")]
    addr: String,

    /// set the listen port
    #[clap(short = 'p', long = "port", default_value = "8080")]
    port: u16,

    #[clap(short = 's', long = "secret", default_value="ERROR: set the SERVER_SECRET env variable", env="SERVER_SECRET")]
    secret: String,

    /// set the directory where static files are to be found
    #[clap(long = "static-dir", default_value = "./frontend/dist")]
    static_dir: String,
}

/// Server that is split into a Frontend to serve static files (Svelte) and Backend
/// Backend is further split into a non authorized area and a secure area
/// The Back end is using 2 middleware: sessions (managing session data) and user_secure (checking for authorization)
#[tokio::main]
async fn main() {
    let opt = Opt::parse();

    //create envFilter for tracing
    let default_filter = EnvFilter::try_from_default_env()
        .or_else(|_| EnvFilter::try_new(&opt.log_level))
        .unwrap();
    // start tracing - level set by either RUST_LOG env variable or defaults to debug
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(default_filter)
        .init();

    tracing::debug!("Options: {:#?}", opt);

    // create store for backend.  Stores an api_token.
    let shared_state = Arc::new(store::Store::new("123456789"));

    // setup up sessions and store to keep track of session information
    let session_layer = SessionLayer::new(MemoryStore::new(), &opt.secret.as_bytes())
        .with_cookie_name(SESSION_COOKIE_NAME);

    // combine the front and backend into server
    let app = Router::new()
        .merge(services::two_serve_dirs())
        //.merge(services::front_routes())
        .merge(services::backend(session_layer, shared_state));

    let addr = SocketAddr::from((
        IpAddr::from_str(opt.addr.as_str()).unwrap_or(IpAddr::V6(Ipv6Addr::LOCALHOST)),
        opt.port,
    ));

    tracing::info!("listening on http://{}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();

}

/// Tokio signal handler that will wait for a user to press CTRL+C.
/// We use this in our `Server` method `with_graceful_shutdown`.
async fn shutdown_signal() {
    tokio::signal::ctrl_c()
        .await
        .expect("Expect shutdown signal handler");
    println!("signal shutdown");
}