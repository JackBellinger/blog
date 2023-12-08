CREATE TEMP TABLE IF NOT EXISTS VARIABLES (Name TEXT PRIMARY KEY, Value ANY);
		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"My experience at Redjack",
			"redjack-experience",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"Blog Template",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Jobs");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"My Development Environment",
			"dev-environment",
			"2023-10-29 16:02:03",
			"2023-10-29T16:02:03",
			"How I set up my machine to work on software",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Workspace");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "SDLC");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"Adding tap dance in my QMK keyboard",
			"qmk-tapdances",
			"2023-11-19 21:09:21",
			"2023-11-19T21:09:21",
			"How I programmed the tap dances on my keyboard with QMK",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Workspace");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "QMK");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "C");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"My thoughts on testing software",
			"testing-thoughts",
			"2023-11-14 23:12:25",
			"2023-11-14T23:12:25",
			"How I think about testing, and decide what tests to write",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Testing");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "SDLC");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"How Blog Posts Work",
			"blog-explainer",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"How to manage existing blog posts and create new ones",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Documentation");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Blog");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Svelte");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"Blog Stack",
			"blog-stack",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"The tech stack I chose for this blog",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Blog");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Documentation");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"blog Structure",
			"blog-structure",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"How code and structure are organized.",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Documentation");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Blog");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Svelte");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Vite");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"My Development Environment Setup and Coding Workflow",
			"code-workflow",
			"2023-10-29 16:02:03",
			"2023-10-29T16:02:03",
			"How I set up my machine to work on software",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "SDLC");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Personal");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"How to Customize this Template",
			"customization",
			"2023-04-22 21:55:27.154000",
			"2023-04-22T21:55:27.154000",
			"How to customize what you're seeing here and make it your own.",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Documentation");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Blog");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"Adding timers in my QMK keyboard",
			"qmk-timers",
			"2023-11-10 04:53:49",
			"2023-11-10T04:53:49",
			"How I programmed the macros on my keyboard with QMK",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Workspace");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "QMK");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "C");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"Blog Ideas",
			"blog-ideas",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"Blog Ideas",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "ideas");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "hidden");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"Blog Template",
			"_blog-template",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"Blog Template",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "templates");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Blog");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"Testing Svelte with Vitest",
			"testing-svelte",
			"2023-11-14 23:12:25",
			"2023-11-14T23:12:25",
			"How I implemented the tests for this blog.",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Testing");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Svelte");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Vite");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Documentation");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"My experience at Amazon",
			"amazon-experience",
			"2023-09-26 02:32:00",
			"2023-09-26T02:32:00",
			"Blog Template",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Jobs");

		

		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"Adding macros in my QMK keyboard",
			"qmk-macros",
			"2023-11-10 04:53:49",
			"2023-11-10T04:53:49",
			"How I programmed the macros on my keyboard with QMK",
			True
		);

		
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "Workspace");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "QMK");

		

		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "C");

		
