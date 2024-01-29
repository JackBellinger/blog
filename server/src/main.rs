use clap::Parser;
use std::{
	net::{IpAddr, SocketAddr},
	str::FromStr,
};
use tracing_subscriber::{prelude::__tracing_subscriber_SubscriberExt, util::SubscriberInitExt, EnvFilter};

mod app;
mod auth;
mod routes;
mod store;
mod utils {
	pub mod workspace;
}

// SETUP Constants
const FRONT_SVELTE_PUBLIC: &str = "./svelte_front/dist";
const FRONT_YEW_PUBLIC: &str = "/yew_front/dist";

// Setup the command line interface with clap.
#[derive(Parser, Debug)]
#[clap(name = "server", about = "A server for our wasm project!")]
struct Opt {
	/// set the log level
	#[clap(short = 'l', long = "log", default_value = "debug")]
	log_level: String,

	/// set the listen addr
	#[clap(short = 'a', long = "addr", default_value = "127.0.0.1")]
	addr: String,

	/// set the listen port
	#[clap(short = 'p', long = "port", default_value = "8080")]
	port: u16,

	#[clap(
		short = 's',
		long = "secret",
		default_value = "ERROR: set the SERVER_SECRET env variable",
		env = "SERVER_SECRET"
	)]
	secret: String,
}

/// Server that is split into a Frontend to serve static files (Svelte) and Backend
/// Backend is further split into a non authorized area and a secure area
/// The Back end is using 2 middleware: sessions (managing session data) and user_secure (checking for authorization)
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
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
	let addr = SocketAddr::new(IpAddr::from_str(&opt.addr).expect("Invalid ip address"), opt.port);
	app::App::new().await?.serve(addr).await
}
