-- # Entity schema.
-- id BIGINT PRIMARY KEY GENERATED{BY DEFAULT} AS IDENTITY,
-- Create `users` table.
CREATE TABLE IF NOT EXISTS users (
    id integer PRIMARY KEY autoincrement,
    username varchar(20) NOT NULL UNIQUE,
    password_hash varchar(100) NOT NULL
);

-- Create `groups` table.
CREATE TABLE IF NOT EXISTS groups (
    id integer PRIMARY KEY autoincrement,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create `permissions` table.
CREATE TABLE IF NOT EXISTS permissions (
    id integer PRIMARY KEY autoincrement,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create `users_groups` table for many-to-many relationships between users and groups.
CREATE TABLE IF NOT EXISTS users_groups (
    user_id integer REFERENCES users(id),
    group_id integer REFERENCES groups(id),
    PRIMARY KEY (user_id, group_id)
);

-- Create `groups_permissions` table for many-to-many relationships between groups and permissions.
CREATE TABLE IF NOT EXISTS groups_permissions (
    group_id integer REFERENCES groups(id),
    permission_id integer REFERENCES permissions(id),
    PRIMARY KEY (group_id, permission_id)
);

-- # Fixture hydration.
-- Insert "guest" user.
INSERT OR IGNORE INTO users (username, password_hash)
VALUES (
        'guest',
        '$argon2d$v=19$m=12,t=3,p=1$OHlncWUwMGRmZDYwMDAwMA$hHnm/XV6xoICqiaVDhrw7w'
    );

-- Insert "admin" user.
INSERT OR IGNORE INTO users (username, password_hash)
VALUES (
        'admin',
        '$argon2d$v=19$m=12,t=3,p=1$OHlncWUwMGRmZDYwMDAwMA$hHnm/XV6xoICqiaVDhrw7w'
    );

-- Insert "users" and "superusers" groups.
INSERT OR IGNORE INTO groups (name)
VALUES ('users');

INSERT OR IGNORE INTO groups (name)
VALUES ('superusers');

-- Insert individual permissions.
INSERT OR IGNORE INTO permissions (name)
VALUES ('protected.read');

INSERT OR IGNORE INTO permissions (name)
VALUES ('restricted.read');

-- Insert group permissions.
INSERT OR IGNORE INTO groups_permissions (group_id, permission_id)
VALUES (
        (
            SELECT id
            FROM groups
            WHERE name = 'users'
        ),
        (
            SELECT id
            FROM permissions
            WHERE name = 'protected.read'
        )
    ),
    (
        (
            SELECT id
            FROM groups
            WHERE name = 'superusers'
        ),
        (
            SELECT id
            FROM permissions
            WHERE name = 'restricted.read'
        )
    );

-- Insert users into groups.
INSERT OR IGNORE INTO users_groups (user_id, group_id)
VALUES (
        (
            SELECT id
            FROM users
            WHERE username = 'guest'
        ),
        (
            SELECT id
            FROM groups
            WHERE name = 'users'
        )
    ),
    (
        (
            SELECT id
            FROM users
            WHERE username = 'admin'
        ),
        (
            SELECT id
            FROM groups
            WHERE name = 'users'
        )
    ),
    (
        (
            SELECT id
            FROM users
            WHERE username = 'admin'
        ),
        (
            SELECT id
            FROM groups
            WHERE name = 'superusers'
        )
    );


-- ========== COMMENTS ==========
-- # Entity schema.
-- when swapping to postgrsql replace: s/ IDENTITY / GENERATED { BY DEFAULT } AS IDENTITY /g
CREATE TABLE IF NOT EXISTS blogs (
    id integer PRIMARY KEY autoincrement,
    slug varchar(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    updated DATETIME NOT NULL,
    hidden BOOLEAN NOT NULL DEFAULT FALSE -- uri varchar(100) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS comments (
    id integer PRIMARY KEY autoincrement,
    user_id integer NOT NULL,
    reply_to integer NOT NULL DEFAULT 0,
    timestamp DATETIME NOT NULL,
    upvotes INT NOT NULL DEFAULT 0,
    hidden BOOLEAN NOT NULL DEFAULT FALSE,
    text TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS blogs_comments (
    blog_id integer NOT NULL,
    comment_id integer NOT NULL,
    PRIMARY KEY (blog_id, comment_id),
    FOREIGN KEY (blog_id) REFERENCES blogs(id),
    FOREIGN KEY (comment_id) REFERENCES comments(id)
);

CREATE TEMP TABLE IF NOT EXISTS VARIABLES (Name TEXT PRIMARY KEY, Value ANY);

-- POST 1
INSERT OR IGNORE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
VALUES (
        "Blog Template",
        "blog-template",
        "2023-09-26T02:32:00.000",
        "2023-09-26T02:32:00.000",
        "Blog Template",
        TRUE
    );
INSERT OR IGNORE INTO VARIABLES
VALUES ('recent_blog', last_insert_rowid());

-- COMMENT 1
INSERT OR IGNORE INTO comments (user_id, timestamp, upvotes, text)
VALUES (
        (
            SELECT id
            FROM users
            WHERE username = "admin"
        ),
        "2023-09-26T02:32:00.000",
        1,
        "First testing comment on blog 1"
    );
INSERT OR IGNORE INTO VARIABLES
VALUES ('recent_comment', last_insert_rowid());

INSERT OR IGNORE INTO blogs_comments (blog_id, comment_id)
VALUES (
        (
            SELECT Value
            FROM VARIABLES
            WHERE Name = 'recent_blog'
        ),
        (
            SELECT Value
            FROM VARIABLES
            WHERE Name = 'recent_comment'
        )
    );

-- COMMENT 2
INSERT OR IGNORE INTO comments (user_id, timestamp, upvotes, text)
VALUES (
        (
            SELECT id
            FROM users
            WHERE username = "guest"
        ),
        "2023-09-26T02:33:00.000",
        1,
        "Second testing comment on blog 1"
    );

INSERT OR IGNORE INTO VARIABLES
VALUES ('recent_comment', last_insert_rowid());

INSERT OR IGNORE INTO blogs_comments (blog_id, comment_id)
VALUES (
        (
            SELECT Value
            FROM VARIABLES
            WHERE Name = 'recent_blog'
        ),
        (
            SELECT Value
            FROM VARIABLES
            WHERE Name = 'recent_comment'
        )
    );


-- POST 2
INSERT OR IGNORE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
VALUES (
        "How Blog Posts Work",
        "blog-explainer",
        "2023-09-26T02:32:00.000",
        "2023-09-26T02:32:00.000",
        "How to manage existing blog posts and create new ones",
        FALSE
    );
INSERT OR IGNORE INTO VARIABLES
VALUES ('recent_blog', last_insert_rowid());

INSERT OR IGNORE INTO tags
VALUES (last_insert_rowid(), "tag");
-- CREATE TABLE tags (
--     id integer PRIMARY KEY autoincrement,
--     name VARCHAR(255) NOT NULL UNIQUE
-- );
-- CREATE TABLE blogs_tags (
--     blog_id integer NOT NULL,
--     tag_id integer NOT NULL,
--     PRIMARY KEY (blog_id, tag_id),
--     FOREIGN KEY (blog_id) REFERENCES blogs(id),
--     FOREIGN KEY (tag_id) REFERENCES tags(id)
-- );
-- COMMENT 3
INSERT OR IGNORE INTO comments (user_id, timestamp, upvotes, text)
VALUES (
        (
            SELECT id
            FROM users
            WHERE username = "admin"
        ),
        "2023-09-26T02:34:00.000",
        2,
        "First testing comment on blog 2"
    );
INSERT OR IGNORE INTO VARIABLES
VALUES ('recent_comment', last_insert_rowid());

INSERT OR IGNORE INTO blogs_comments (blog_id, comment_id)
VALUES (
        (
            SELECT Value
            FROM VARIABLES
            WHERE Name = 'recent_blog'
        ),
        (
            SELECT Value
            FROM VARIABLES
            WHERE Name = 'recent_comment'
        )
    );