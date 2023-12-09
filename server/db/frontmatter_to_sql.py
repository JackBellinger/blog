#!/usr/bin/env python3
import os
import sys
import re
from datetime import datetime
import argparse

def get_filename(path):
  filename, _ = os.path.splitext(os.path.basename(path))
  return filename

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
	title = frontmatter["title"]
	slug = get_filename(article_path)

	# Extract other attributes
	timestamp = datetime.strptime(frontmatter["date"],"%Y-%m-%dT%H:%M:%S.%fZ")
	updated = timestamp.isoformat()
	excerpt = frontmatter["excerpt"]
	hidden = bool(frontmatter.get("hidden", False))

	# Build insert statements for blogs and tags
	blog_insert = f"""
		INSERT OR REPLACE INTO blogs (title, slug, timestamp, updated, excerpt, hidden)
		VALUES (
			"{title}",
			"{slug}",
			"{timestamp}",
			"{updated}",
			"{excerpt}",
			{hidden}
		);

		"""

	tags_insert = []
	for tag in frontmatter.get("tags"):
		# print(f"tag: {tag}")
		tags_insert.append(f"""
		INSERT OR REPLACE INTO tags
		VALUES ((SELECT Value FROM VARIABLES WHERE Name = 'recent_blog'), "{tag}");

		""")
	print(f"blog_insert, tags_insert: { blog_insert}, {tags_insert}")
	return blog_insert, tags_insert

def process_directory(directory_path, output_file):
	with open(output_file, 'w') as outfile:
		tmp_table_line = "CREATE TEMP TABLE IF NOT EXISTS VARIABLES (Name TEXT PRIMARY KEY, Value ANY);"
		outfile.write(tmp_table_line)
		for filename in os.listdir(directory_path):
			filepath = os.path.join(directory_path, filename)
			if os.path.isfile(filepath) and filename.endswith(".svx"):
				print(f"processing file: {filename}")
				blog_insert, tags_insert = convert_article(filepath)
				outfile.write(blog_insert)
				for insert in tags_insert:
					outfile.write(insert)
					outfile.write("\n")

def main():
	parser = argparse.ArgumentParser(description="Generate SQL statements from markdown files")
	parser.add_argument("directory_path", help="Path to the directory containing markdown files")
	parser.add_argument("--output-file", "-o", help="Path to the output file", default="sql_statements.sql")

	args = parser.parse_args()

	if not os.path.isdir(args.directory_path):
		print(f"Error: '{args.directory_path}' is not a valid directory")
		sys.exit(1)

	process_directory(args.directory_path, args.output_file)

if __name__ == "__main__":
	main()