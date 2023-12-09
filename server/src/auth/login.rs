use crate::auth::users::{AuthSession, Credentials};
use askama::Template;
use axum::{
	extract::Query,
	http::StatusCode,
	response::{IntoResponse, Redirect},
	routing::{get, post},
	Form, Router,
};
use serde::Deserialize;

#[derive(Template)]
#[template(path = "signup.html")]
pub struct SignUpTemplate {
	message: Option<String>,
	next: Option<String>,
}

#[derive(Template)]
#[template(path = "login.html")]
pub struct LoginTemplate {
	message: Option<String>,
	next: Option<String>,
}

// This allows us to extract the "next" field from the query string. We use this
// to redirect after log in.
#[derive(Debug, Deserialize)]
pub struct NextUrl {
	next: Option<String>,
}

pub fn router() -> Router<()> {
	Router::new()
		.route("/signup", get(self::get::signup))
		.route("/signup", post(self::post::signup))
		.route("/login", get(self::get::login))
		.route("/login", post(self::post::login))
		.route("/logout", get(self::get::logout))
}

mod post {
	use super::*;
	use crate::auth::users::SignUp;
	pub async fn signup(auth_session: AuthSession, Form(creds): Form<Credentials>) -> impl IntoResponse {
		let _new_user = match auth_session.make_user(creds.clone()).await {
			Ok(Some(user)) => user,
			Ok(None) => {
				return SignUpTemplate {
					message: Some("Invalid credentials.".to_string()),
					next: creds.next,
				}
				.into_response()
			}
			Err(_) => return StatusCode::INTERNAL_SERVER_ERROR.into_response(),
		};

		tracing::debug!("wahwah wee wah{:#?}", auth_session);

		if let Some(ref next) = creds.next {
			tracing::debug!("going to next: {}", next);
			Redirect::temporary(&format!("/login?next={}", next)).into_response()
		} else {
			Redirect::to("/").into_response()
		}
	}
	pub async fn login(mut auth_session: AuthSession, Form(creds): Form<Credentials>) -> impl IntoResponse {
		let user = match auth_session.authenticate(creds.clone()).await {
			Ok(Some(user)) => user,
			Ok(None) => {
				return LoginTemplate {
					message: Some("Invalid credentials.".to_string()),
					next: creds.next,
				}
				.into_response()
			}
			Err(_) => return StatusCode::INTERNAL_SERVER_ERROR.into_response(),
		};

		if auth_session.login(&user).await.is_err() {
			return StatusCode::INTERNAL_SERVER_ERROR.into_response();
		}

		if let Some(ref next) = creds.next {
			tracing::debug!("going to next: {}", next);
			Redirect::to(next).into_response()
		} else {
			Redirect::to("/").into_response()
		}
	}
}

mod get {
	use super::*;

	pub async fn signup(Query(NextUrl { next }): Query<NextUrl>) -> SignUpTemplate {
		SignUpTemplate { message: None, next }
	}

	pub async fn login(Query(NextUrl { next }): Query<NextUrl>) -> LoginTemplate {
		LoginTemplate { message: None, next }
	}

	pub async fn logout(mut auth_session: AuthSession, Query(NextUrl { next }): Query<NextUrl>) -> impl IntoResponse {
		match auth_session.logout() {
			Ok(_) => {
				if let Some(ref next) = next {
					tracing::debug!("going to next: {}", next);
					Redirect::to(next).into_response()
				} else {
					Redirect::to("/").into_response()
				}
			}
			Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
		}
	}
}
