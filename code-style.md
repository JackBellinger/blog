# Coding Style and Architectural Guide

## 1. Philosophy

The primary goal is to create code that is not just functional, but is a joy to work with. We build frameworks, not just features. Every piece of code should be written with the intention of making the *next* piece of code easier to write. This means prioritizing modularity, clear abstractions, and building systems that automate common patterns, reducing boilerplate and minimizing the chance for manual error.

The ideal codebase is:
* **Framework-Oriented:** New features (like pages or components) should be able to "self-register" with minimal changes to existing code.
* **Readable:** Code is for humans first, machines second. Clarity trumps cleverness.
* **Maintainable:** It should be easy to modify and extend the system without introducing bugs.
* **Refactorable:** The structure should allow for easy refactoring as the system evolves.

### 1.1. Achieving Our Philosophical Goals

#### Framework-Oriented Code

*   **How:** Identify repetitive patterns in your workflow. Instead of copying and pasting code, create an abstraction. This could be a function, a class, a component, or even a script that generates boilerplate code.
*   **Example:** The page routing system. Instead of manually adding a route for each new page, the system automatically discovers and registers them.
*   **Litmus Test:** If adding a new, common feature (like a blog post, a project page, etc.) requires you to touch more than two files, consider if you can create a better abstraction.

#### Readable Code

*   **How:**
    *   **Descriptive Naming:** Names of variables, functions, and classes should be long enough to be descriptive, but short enough to be easily readable.
    *   **Consistent Formatting:** Use automated tools like `prettier` and `rustfmt` to ensure consistent formatting across the entire codebase.
    *   **Minimal Comments:** Write code that is self-documenting. Comments should explain the *why*, not the *what*.
*   **Litmus Test:** Can a new developer understand the purpose of a piece of code without having to ask you?

#### Maintainable Code

*   **How:**
    *   **Single Responsibility Principle:** Each function, class, or module should have a single, well-defined responsibility.
    *   **Loose Coupling:** Components and modules should be as independent as possible. Changes in one part of the system should not have unintended consequences in another.
    *   **Comprehensive Testing:** A robust test suite is the best safety net for maintaining a large codebase.
*   **Litmus Test:** Can you fix a bug or add a new feature without breaking existing functionality?

#### Refactorable Code

*   **How:**
    *   **High Cohesion:** Related code should be kept together. This makes it easier to understand the impact of a change and to extract code into new modules or components.
    *   **Low Coupling:** (See "Maintainable Code")
    *   **Abstraction:** Use interfaces, traits, and other forms of abstraction to hide implementation details. This allows you to change the underlying implementation without affecting the rest of the system.
*   **Litmus Test:** Can you change the implementation of a component or module without having to change the code that uses it?

## 2. Architectural Patterns

The project employs a clean, decoupled architecture that supports our philosophy of framework-driven development.

* **Monorepo:** The codebase is organized as a monorepo, with clear separation between the `server/` (Rust backend) and `svelte_front/` (Svelte frontend). This provides a single source of truth while maintaining a logical boundary between the client and server.
* **Client-Server Model:** A traditional and robust model where the backend is a stateless API server and the frontend is a dynamic single-page application (SPA).
* **Modular Design:** Both frontend and backend are heavily modular. In Rust, this is achieved through Rust's native module system. In Svelte, this is achieved through a component-based architecture and a well-defined directory structure.

## 3. Framework-Driven Development

This is the cornerstone of our development style. We build abstractions that allow for rapid development by establishing clear conventions.

### 3.1. Convention Over Configuration

We prefer to write code that follows conventions rather than requiring explicit configuration.

* **Example: Svelte Page Routing**
	* **Pattern:** Any Svelte component placed in the `svelte_front/src/pages/` directory is automatically registered as a navigable page.
	* **Mechanism:** The build process or a routing utility dynamically imports all modules from this directory to create the application's routes.
	* **Benefit:** To create a new page, a developer simply adds a new file. There is no need to manually edit a central `routes.ts` file, which reduces friction and eliminates a potential source of error.

* **Example: Page Metadata**
	* **Pattern:** Each page component can export metadata from its `context="module"` script (e.g., `pagePriority`, `hidden`).
	* **Mechanism:** The navigation components (like the header) can import these page modules and read their exported metadata to dynamically decide whether to show a page in the nav bar and in what order.
	* **Benefit:** Pages are self-describing. The logic for how a page integrates with the rest of the application is co-located with the page itself, making the system easier to reason about.

### 3.2. Composable Abstractions

We build small, reusable pieces of logic and compose them to create larger systems.

* **Example: Rust Route Handlers**
	* **Pattern:** In the `server/src/routes/` directory, each module (e.g., `blogs.rs`, `comments.rs`) defines a set of related Axum `Router` handlers.
	* **Mechanism:** The main `app.rs` file aggregates these smaller, feature-specific routers into the main application router.
	* **Benefit:** This keeps route definitions organized by feature, preventing the main application setup from becoming bloated. It also allows for feature-specific middleware to be applied cleanly.

* **Example: Svelte Component Architecture**
	* **Pattern:** The frontend follows an atomic design methodology, with components organized into `atoms`, `molecules`, and `organisms`.
	* **Mechanism:** Small, generic components (`atoms`) are composed to build more complex, feature-specific components (`organisms`).
	* **Benefit:** This promotes reusability and creates a consistent visual and interactive language across the application.

## 4. Language-Specific Guidelines

### 4.1. Svelte & TypeScript (Frontend)

* **Directory Structure:**
	* `src/pages/`: For top-level page components.
	* `src/lib/components/`: For reusable components, often structured atomically.
	* `src/lib/utils/`: For shared utilities, stores, and type definitions.
* **Component Structure:** Adhere to a consistent order within `.svelte` files.
	1. `script context="module"` for static, page-level data.
	2. `script` for component logic.
	3. HTML template for structure.
	4. `style` for component-scoped styles.
* **State Management:** Use Svelte stores (`writable`, `readable`) for cross-component state. Keep stores focused on a single domain of data.

### 4.2. Rust (Backend)

* **Configuration:**
	* Use `clap` for parsing command-line arguments and environment variables. This provides a clear, self-documenting interface for server configuration.
	* Use a `.env` file for local development secrets and configuration.
* **Error Handling:**
	* Use the `Result` type and the `?` operator for all fallible operations.
	* Avoid using `.unwrap()` or `.expect()` outside of tests or application entry points where a panic is the desired behavior.
* **Database:**
	* Use `sqlx` for its compile-time checked queries, which prevents a large class of runtime errors.
	* Keep database interaction logic contained within a dedicated `store.rs` module or similar data-access layer.
