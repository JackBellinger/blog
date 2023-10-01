use std::ffi::OsString;
use std::fs::read_dir;
use std::path::{PathBuf, Path};
use std::{env, io};
use std::io::ErrorKind;

/// Get the project root (relative to closest Cargo.lock file)
/// ```rust
/// match project_root::get_project_root() {
///     Ok(p) => println!("Current project root is {:?}", p),
///     Err(e) => println!("Error obtaining project root {:?}", e)
/// };
/// ```
pub fn get_project_root() -> io::Result<PathBuf> {
    let path = env::current_dir()?;
    let mut path_ancestors = path.as_path().ancestors();
    let mut project_root = Path::new("./");
    while let Some(p) = path_ancestors.next() {
        let has_cargo =
            read_dir(p)?
                .into_iter()
                .any(|p| p.unwrap().file_name() == OsString::from("Cargo.lock"));
        if has_cargo {
            project_root = p;
        } else {
            return Ok(PathBuf::from(project_root))
        }
    }
    Err(io::Error::new(ErrorKind::NotFound, "Ran out of places to find Cargo.toml"))
}