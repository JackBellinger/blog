-- Add blog metadata columns for scrolling api

ALTER TABLE blogs
ADD COLUMN	title VARCHAR(255) NOT NULL;
ALTER TABLE blogs
ADD COLUMN	excerpt TEXT NOT NULL;
ALTER TABLE blogs
ADD COLUMN	timestamp DATETIME NOT NULL;
ALTER TABLE blogs
ADD COLUMN	updated DATETIME NOT NULL;
ALTER TABLE blogs
ADD COLUMN	hidden BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE blogs
ADD COLUMN	coverImage VARCHAR(255) NOT NULL;

CREATE TABLE if not exists tags (
	id integer PRIMARY KEY autoincrement,
	name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS blogs_tags (
	blog_id integer NOT NULL,
	tag_id integer NOT NULL,
	PRIMARY KEY (blog_id, tag_id),
	FOREIGN KEY (blog_id) REFERENCES blogs(id),
	FOREIGN KEY (tag_id) REFERENCES tags(id)
);