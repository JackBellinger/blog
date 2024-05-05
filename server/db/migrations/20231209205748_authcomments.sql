-- # Init schema for Auth and Comments

-- Create `users` table.
CREATE TABLE IF NOT EXISTS users (
    id integer PRIMARY KEY autoincrement,
    username varchar(20) NOT NULL UNIQUE,
    password_hash varchar(100) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
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
VALUES ('login.read');
INSERT OR IGNORE INTO permissions (name)
VALUES ('login.write');

INSERT OR IGNORE INTO permissions (name)
VALUES ('admin.read');
INSERT OR IGNORE INTO permissions (name)
VALUES ('admin.write');

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
            WHERE name = 'login.read'
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
            WHERE name = 'login.write'
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
            WHERE name = 'admin.read'
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
            WHERE name = 'admin.write'
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
    slug varchar(20) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs (slug);

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
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments (user_id);

CREATE TABLE IF NOT EXISTS blogs_comments (
    blog_id integer NOT NULL,
    comment_id integer NOT NULL,
    PRIMARY KEY (blog_id, comment_id),
    FOREIGN KEY (blog_id) REFERENCES blogs(id),
    FOREIGN KEY (comment_id) REFERENCES comments(id)
);
CREATE INDEX IF NOT EXISTS idx_blogs_comments_blog_id_comment_id ON blogs_comments(blog_id, comment_id);