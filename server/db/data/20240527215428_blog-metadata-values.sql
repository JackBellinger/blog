CREATE TEMP TABLE IF NOT EXISTS VARIABLES (Name TEXT PRIMARY KEY, Value ANY);
		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Markdown Guide'),
			"Markdown Guide",
			"markdown-guide",
			"2023-04-22 21:55:15.361000",
			"2023-04-22T21:55:15.361000",
			"Markdown Guide",
			True,
			"/blog/assets/images/Boulder.png"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Markdown");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'markdown-guide'), (select id from tags where name = 'Markdown'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'About Me'),
			"About Me",
			"aboutme",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"a summary of my experience, skills, and knowledge",
			True,
			"https://picsum.photos/200"
		);

		
		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'How to Customize this Template'),
			"How to Customize this Template",
			"customization",
			"2023-04-22 21:55:27.154000",
			"2023-04-22T21:55:27.154000",
			"How to customize what you're seeing here and make it your own.",
			False,
			"/blog/assets/images/customize-template.avif"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Blog");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'customization'), (select id from tags where name = 'Blog'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("Documentation");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'customization'), (select id from tags where name = 'Documentation'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Blog Stack'),
			"Blog Stack",
			"blog-stack",
			"2023-09-26 02:32:00",
			"2023-11-22 21:45:39",
			"The tech stack I chose for this blog",
			False,
			"/blog/assets/images/blog-stack.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Blog");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'blog-stack'), (select id from tags where name = 'Blog'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("Documentation");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'blog-stack'), (select id from tags where name = 'Documentation'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Adding macros in my QMK keyboard'),
			"Adding macros in my QMK keyboard",
			"qmk-macros",
			"2023-11-10 04:53:49",
			"2023-12-06 17:53:00",
			"How I programmed the macros on my keyboard with QMK",
			False,
			"/blog/assets/images/qmk-layers.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Workspace");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'qmk-macros'), (select id from tags where name = 'Workspace'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("C");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'qmk-macros'), (select id from tags where name = 'C'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Blog Template'),
			"Blog Template",
			"0h-blog-template",
			"2023-09-26 02:32:00",
			"2023-09-26 02:32:00",
			"Blog Template",
			True,
			"https://picsum.photos/200"
		);

		
		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'My Development Environment'),
			"My Development Environment",
			"dev-environment",
			"2023-10-29 16:02:03",
			"2023-10-30 15:39:05",
			"How I set up my machine to work on software",
			False,
			"/blog/assets/images/dev-env.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("SDLC");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'dev-environment'), (select id from tags where name = 'SDLC'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("Workspace");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'dev-environment'), (select id from tags where name = 'Workspace'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Common Software Design Considerations'),
			"Common Software Design Considerations",
			"0h-design-tradeoffs",
			"2024-01-21 21:45:49",
			"2024-01-21 21:45:49",
			"How I think about some of the common design decisions in computer science.",
			True,
			"https://picsum.photos/200"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Design");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-design-tradeoffs'), (select id from tags where name = 'Design'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("SDLC");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-design-tradeoffs'), (select id from tags where name = 'SDLC'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Network Security'),
			"Network Security",
			"network-security",
			"2024-03-06 17:55:02",
			"2024-05-27 19:05:06",
			"Architecting and configuring a network for security and observability",
			False,
			"/blog/assets/images/network-security.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Networks");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'network-security'), (select id from tags where name = 'Networks'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("Workspace");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'network-security'), (select id from tags where name = 'Workspace'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Temporal Dynamic Macros design and implementation'),
			"Temporal Dynamic Macros design and implementation",
			"qmk-dynamic-macros",
			"2024-02-18 04:47:09",
			"2024-05-27 19:05:06",
			"The design and implementation of temporal dynamic macros in QMK.",
			False,
			"/blog/assets/images/qmk-replay.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Workspace");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'qmk-dynamic-macros'), (select id from tags where name = 'Workspace'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("C");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'qmk-dynamic-macros'), (select id from tags where name = 'C'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Blog Ideas'),
			"Blog Ideas",
			"0h-blog-ideas",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"Blog Ideas",
			True,
			"https://picsum.photos/200"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Ideas");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-blog-ideas'), (select id from tags where name = 'Ideas'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'My experience at Amazon'),
			"My experience at Amazon",
			"0h-amazon-experience",
			"2023-09-26 02:32:00",
			"2023-11-10 04:53:49",
			"Blog Template",
			True,
			"/blog/assets/images/pv-sports.avif"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Jobs");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-amazon-experience'), (select id from tags where name = 'Jobs'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'My thoughts on testing software'),
			"My thoughts on testing software",
			"testing-thoughts",
			"2023-11-14 23:12:25",
			"2023-11-21 18:18:52",
			"How I think about testing, and decide what tests to write",
			False,
			"/blog/assets/images/testing.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("TestingW");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'testing-thoughts'), (select id from tags where name = 'TestingW'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("SDLC");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'testing-thoughts'), (select id from tags where name = 'SDLC'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Testing Svelte with Vitest'),
			"Testing Svelte with Vitest",
			"testing-svelte",
			"2023-11-14 23:12:25",
			"2023-11-23 20:07:01",
			"How I implemented the tests for this blog.",
			False,
			"/blog/assets/images/vitest.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Testing");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'testing-svelte'), (select id from tags where name = 'Testing'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("Blog");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'testing-svelte'), (select id from tags where name = 'Blog'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("Documentation");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'testing-svelte'), (select id from tags where name = 'Documentation'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'My experience at Redjack'),
			"My experience at Redjack",
			"0h-redjack-experience",
			"2023-09-26 02:32:00",
			"2023-11-10 04:53:49",
			"Blog Template",
			True,
			"/blog/assets/images/pv-sports.avif"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Jobs");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-redjack-experience'), (select id from tags where name = 'Jobs'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Adding timers in my QMK keyboard'),
			"Adding timers in my QMK keyboard",
			"qmk-timers",
			"2023-11-10 04:53:49",
			"2023-12-06 17:53:00",
			"How I programmed the macros on my keyboard with QMK",
			False,
			"/blog/assets/images/qmk-stopwatch.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Workspace");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'qmk-timers'), (select id from tags where name = 'Workspace'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("C");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'qmk-timers'), (select id from tags where name = 'C'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'blog Structure'),
			"blog Structure",
			"blog-structure",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"How code and structure are organized.",
			False,
			"/blog/assets/images/project-structure.avif"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Blog");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'blog-structure'), (select id from tags where name = 'Blog'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("Documentation");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'blog-structure'), (select id from tags where name = 'Documentation'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'My Development Environment Setup and Coding Workflow'),
			"My Development Environment Setup and Coding Workflow",
			"0h-code-workflow",
			"2023-10-29 16:02:03",
			"2023-10-30 15:39:05",
			"How I set up my machine to work on software",
			True,
			"/blog/assets/images/dev-env.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("SDLC");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-code-workflow'), (select id from tags where name = 'SDLC'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'How Blog Posts Work'),
			"How Blog Posts Work",
			"blog-explainer",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"How to manage existing blog posts and create new ones",
			False,
			"/blog/assets/images/mdsvex.avif"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Blog");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'blog-explainer'), (select id from tags where name = 'Blog'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("Documentation");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'blog-explainer'), (select id from tags where name = 'Documentation'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Adding tap dance in my QMK keyboard'),
			"Adding tap dance in my QMK keyboard",
			"qmk-tapdances",
			"2023-11-19 21:09:21",
			"2023-12-06 17:53:00",
			"How I programmed the tap dances on my keyboard with QMK",
			False,
			"/blog/assets/images/qmk-tapdance.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Workspace");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'qmk-tapdances'), (select id from tags where name = 'Workspace'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("C");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'qmk-tapdances'), (select id from tags where name = 'C'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Lofi Generation'),
			"Lofi Generation",
			"0h-lofi-gen",
			"2023-09-26 02:32:00",
			"2023-11-11 17:49:12",
			"Converting a Python lofi music generator to Rust and adapting the webpack frontend to svelte.",
			True,
			"/blog/assets/images/lofi.avif"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("ML");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-lofi-gen'), (select id from tags where name = 'ML'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Leetcode Solutions'),
			"Leetcode Solutions",
			"0h-leetcode",
			"2023-11-10 18:55:37",
			"2023-11-10 18:55:37",
			"Template for project reports",
			True,
			"https://picsum.photos/200"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Leetcode");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-leetcode'), (select id from tags where name = 'Leetcode'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'FFT Noise Filtering'),
			"FFT Noise Filtering",
			"fft-noise",
			"2023-10-04 20:34:02.040000",
			"2023-10-04T20:34:02.040000",
			"Building an application to filter white noise from sound files.",
			False,
			"/blog/assets/images/fft-noise.avif"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Math");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'fft-noise'), (select id from tags where name = 'Math'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Database Design'),
			"Database Design",
			"database-design",
			"2023-12-02 16:10:00",
			"2023-12-05 19:18:34",
			"The SQL table schemas for the backend and planned features.",
			False,
			"/blog/assets/images/db-diagram.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Database");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'database-design'), (select id from tags where name = 'Database'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Automatic Database Diagramming and Creation'),
			"Automatic Database Diagramming and Creation",
			"0h-auto-db",
			"2023-12-02 16:10:00",
			"2023-12-05 19:18:34",
			"How I automatically generate Entity-Relationship Diagrams and SQL schemas from markdown.",
			True,
			"/blog/assets/images/db-diagram.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Database");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '0h-auto-db'), (select id from tags where name = 'Database'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Blog Development Log'),
			"Blog Development Log",
			"blog-devlog",
			"2023-09-26 02:32:00",
			"2023-11-22 21:45:39",
			"How I created this blog",
			False,
			"/blog/assets/images/app-architectures.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Blog");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'blog-devlog'), (select id from tags where name = 'Blog'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Project Template'),
			"Project Template",
			"0h-project-template",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"Template for project reports",
			True,
			"https://picsum.photos/200"
		);

		
		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'My Keyboard'),
			"My Keyboard",
			"keyboard",
			"2023-11-10 04:53:49",
			"2023-11-10 04:53:49",
			"How I bought and built my keyboard.",
			False,
			"/blog/assets/images/ikki-aurora.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Workspace");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'keyboard'), (select id from tags where name = 'Workspace'));
		

		INSERT OR IGNORE INTO tags(name)
		VALUES ("C");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'keyboard'), (select id from tags where name = 'C'));
		

		INSERT OR REPLACE INTO blogs (id, title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			(select id from blogs where title = 'Infinite Scroller'),
			"Infinite Scroller",
			"infinite-scroller",
			"2023-10-29 16:02:03",
			"2024-01-17 18:12:46",
			"The design and implementation of this blog's infinite scroller component.",
			False,
			"/blog/assets/images/inf-scroll.webp"
		);

		
		INSERT OR IGNORE INTO tags(name)
		VALUES ("Blog");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = 'infinite-scroller'), (select id from tags where name = 'Blog'));
		
