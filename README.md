# My blog
A personal blog / portfolio to post articles and devlogs.

# Tech Stack
Built with Svelte, Vite, and Axum.
The backend is in the server directory and the blog frontend is in the svelte_front directory.
There's a placeholder yew todo app is in the yew_front directory that I added to test out serving multiple frontends from the same webserver.
The frontend is currently hosted on Github pages for simplicity until I implement backend features. 

Check out the [devlog](https://jackbellinger.github.io/blog/projects/blog-devlog) for more details.


It was built with a few goals in mind:

- Responsive design: the website looks and behaves well on screens of all sizes;
- Fast: it only loads what's needed for it to work
- Client-first: all the content is static so interaction is blazingly fast;
- Adaptive: it supports dark mode from most operating systems by default (desktop and mobile);
- Pretty: have a pleasant design that is both accessible and pleasing to the eye.

# Live site

The blog (svelte_front) is currently hosted on github pages at [jackbellinger.github.io/blog](https://jackbellinger.github.io/blog). The backend will be up soon once I finish testing and pick domain name & a hosting location.

# Dependencies
You'll need NodeJS, NPM, and Rust installed. 

NodeJs - [Install](https://nodejs.org/en/download/)
Rust - [Install](https://www.rust-lang.org/tools/install)
Trunk - [Install](https://trunkrs.dev/#install)

To install the blog's dependencies, 


# Building & Running Locally
To run the whole app locally, you'll need to 

### Build and bundle the Svelte frontend
```shell
cd svelte_front
# Install dependencies
npm ci
# Compile the SvelteJS and bundle with Vite
npm run build
# Move the assets & 404 page to the right location
npm run bundle
```
### Build and Bundle the Yew frontend
For the Yew app there's a build script
```shell
cd yew_front
#Run the build script 
./build-and-bundle.sh
```
All it does is:
```shell
trunk build --release --dist "dist/yew" --public-url "/yew"
(cd dist/yew && tar c .) | (cd dist && tar xf -)
rm -rf dist/yew
```

### Build and run the Axum Backend
```shell
cargo audit && cargo build
export SERVER_SECRET=$(openssl rand -base64 64)
cargo run --bin server --release -- --addr localhost --port 5173 --log debug
```

### You can also hot-reload the blog 
```shell
cd svelte_front
# Install dependencies
npm ci
# Run hot-reloading localhost frontend
npm run dev
```

The site should now be available at http://localhost:5173/ on your local machine, and your local machine's IP address on your network—great for testing on mobile OSes.

# Managing Posts

All posts are Markdown files that are processed with [MDsveX](https://mdsvex.pngwn.io/) to allow using Svelte components inside them. Make sure to set the file association for .svx files to Markdown to get highlighting. I use a browser and hot reloading to preview the markdown, but there's also a [Front Matter VS Code extension](https://frontmatter.codes/).

# Hosting
There's a github action in the repo to publish the svelte_front static builds to github pages. I'll add details on deployment once I host my own backend.
