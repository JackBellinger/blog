#!/usr/bin/env python3
import os
import sys
import re
import datetime
import argparse

def get_filename(path):
  filename, _ = os.path.splitext(os.path.basename(path))
  return filename

def str2bool(v):
  return str(v).lower() in ("yes", "true", "t", "1")

def convert_article(article_path):
	with open(article_path, 'r') as f:
		content = f.read()

	# Extract frontmatter
	frontmatter_match = re.search(r"^---(.*?)---$", content, re.DOTALL | re.MULTILINE)
	frontmatter = {}
	frontmatter["tags"] = []
	if frontmatter_match:
		for line in frontmatter_match.group(1).splitlines():
			# print(f"line: {line}")
			if ":" in line and "tag" not in line:
				key, value = line.split(": ", 1)
				frontmatter[key.strip()] = value.strip()
			elif "-" in line:
				tag_value = line.split("-")[-1].strip()
				frontmatter["tags"].append(tag_value)

	# Extract title and slug
	# print(f"{frontmatter}")
	title = frontmatter["title"]
	slug = get_filename(article_path)

	# Extract other attributes
	timestamp = datetime.datetime.strptime(frontmatter["date"],"%Y-%m-%dT%H:%M:%S.%fZ")
	updated = timestamp.isoformat()
	excerpt = frontmatter["excerpt"]
	hidden = str2bool(frontmatter.get("hidden", False))
	coverImage = frontmatter["coverImage"]
	# print(f"ins{title},{slug},{timestamp},{updated},{excerpt},{hidden}")

	# Build insert statements for blogs and tags
	blog_insert = f"""
		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden, coverImage)
		VALUES (
			"{title}",
			"{slug}",
			"{timestamp}",
			"{updated}",
			"{excerpt}",
			{hidden},
			"{coverImage}"
		);

		"""

	tags_insert = []
	for tag in frontmatter.get("tags"):
		# print(f"tag: {tag}")
		tags_insert.append(f"""
		INSERT OR IGNORE INTO tags(name)
		VALUES ("{tag}");
		
		INSERT OR IGNORE INTO blogs_tags(blog_id, tag_id)
		VALUES ( (select id from blogs where slug = '{slug}'), (select id from tags where name = '{tag}'));
		""")
	# print(f"blog_insert, tags_insert: { blog_insert}, {tags_insert}")
	return blog_insert, tags_insert

def process_directory(directory_path, output_file):
	with open(output_file, 'w') as outfile:
		tmp_table_line = "CREATE TEMP TABLE IF NOT EXISTS VARIABLES (Name TEXT PRIMARY KEY, Value ANY);"
		outfile.write(tmp_table_line)
		svx_files = [os.path.join(root, name)
			for root, dirs, files in os.walk(directory_path)
				for name in files
					if name.endswith(".mdx")]
		for filepath in svx_files:
			# print(f"processing file: {filename}")
			blog_insert, tags_insert = convert_article(filepath)
			outfile.write(blog_insert)
			for insert in tags_insert:
				outfile.write(insert)
				outfile.write("\n")

def main():
	parser = argparse.ArgumentParser(description="Generate SQL statements from markdown files")
	parser.add_argument("--directory_path", "-d", help="MD Directory path", default=f"../../svelte_front/assets/md")
	now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=0), 'UTC')).strftime("%Y%m%d%H%M%S")
	parser.add_argument("--output-file", "-o", help="Output file path", default=f"./data/{now}_blog-metadata-values.sql")

	args = parser.parse_args()

	if not os.path.isdir(args.directory_path):
		print(f"Error: '{args.directory_path}' is not a valid directory")
		sys.exit(1)
	print(f"crawling {args.directory_path} for markdown")
	print(f"outputting to {args.output_file}")
	process_directory(args.directory_path, args.output_file)

if __name__ == "__main__":
	main()