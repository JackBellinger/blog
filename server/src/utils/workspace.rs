use std::{
	env,
	fs::read_dir,
	io,
	io::ErrorKind,
	path::{Path, PathBuf},
};

/// Get the project root (relative to closest Cargo.lock file)
/// ```rust
/// match project_root::get_project_root() {
/// 	Ok(p) => println!("Current project root is {:?}", p),
/// 	Err(e) => println!("Error obtaining project root {:?}", e),
/// };
/// ```
pub fn get_project_root() -> io::Result<PathBuf> {
	let path = env::current_dir()?;
	let mut project_root = Path::new("./");
	for p in path.as_path().ancestors() {
		let has_cargo = read_dir(p)?.any(|p| p.unwrap().file_name() == *"Cargo.toml");
		if has_cargo {
			project_root = p;
		} else {
			return Ok(PathBuf::from(project_root));
		}
	}

	Err(io::Error::new(
		ErrorKind::NotFound,
		"Ran out of places to find Cargo.toml",
	))
}
