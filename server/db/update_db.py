#! /usr/bin/env python3
import os
import datetime
import sqlite3
import argparse

def run_migrations(offset_days=1, specific_date=None, migrations_dir="./data/", db_name="blog.db"):
	"""
	Reads an offset in days or a specific date and runs all SQLite migrations in the given directory
	with timestamps after the calculated timestamp.

	Args:
			offset_days: The number of days offset from the current date (default: None).
			specific_date: The specific date in YYYYMMDD format (default: None).
			migrations_dir: The directory containing SQLite migration files (default: "./data/").
	"""

	# Calculate target timestamp based on input
	if specific_date:
		# Check if the specific date is only MMDD
		if len(specific_date) == 4:
			# Prepend the current year
			current_year = datetime.datetime.now().year
			specific_date = f"{current_year}{specific_date}{000000}"
		elif len(specific_date) == 8:
			specific_date = f"{specific_date}{000000}"
		try:
			target_timestamp = datetime.datetime.strptime(specific_date, "%Y%m%d%H%M%S")
		except ValueError:
			raise ValueError("Invalid date format. Please use YYYYMMDDHHMMSS.")
	else:
		# Use offset if provided, otherwise default to migrations from the past day
		target_timestamp = datetime.datetime.now() - datetime.timedelta(days=offset_days or 1)

	# Get migration files
	migration_files = [f for f in os.listdir(migrations_dir) if f.endswith(".sql")]
	# Sort by timestamp (assuming filename format YYYYMMDDHHMMSS.sql)
	migration_files.sort(key=lambda f: datetime.datetime.strptime(f[:14], "%Y%m%d%H%M%S"))
	migration_files = [
		f for f in migration_files
		if datetime.datetime.strptime(f[:14], "%Y%m%d%H%M%S") > target_timestamp
	]
	print(f"Running migrations since {target_timestamp}:\n {migration_files}")
	input("wait?")
	# Loop through migrations and run those with timestamps after the target
	for migration_file in migration_files:
		migration_timestamp = datetime.datetime.strptime(migration_file[:14], "%Y%m%d%H%M%S")
		if migration_timestamp > target_timestamp:
			# Connect to database
			conn = sqlite3.connect(os.path.join("./", db_name))

			# Execute migration script
			with open(os.path.join(migrations_dir, migration_file), "r") as f:
				migration_script = f.read()
			conn.executescript(migration_script)
			conn.commit()
			conn.close()
			print(f"Applied migration: {migration_file}")

# Example usage with offset
# run_migrations(offset_days=1)	# Run migrations from the previous day

# # Example usage with specific date
# run_migrations(specific_date="20240505")	# Run migrations after 2024-05-05


def parse_args():
	"""
	Parses command-line arguments using argparse.

	Returns:
			A namespace object containing parsed arguments.
	"""
	parser = argparse.ArgumentParser(description="Run SQLite migrations based on offset or date.")
	parser.add_argument("positional_offset", nargs="?", help="Positional argument")
	parser.add_argument("-o", "--offset", type=int, default=1, help="Number of days offset from current date (default: -1)")
	parser.add_argument("-d", "--date", type=str, help="Specific date in MMDD, YYYYMMDD, or YYYYMMDDHHMMSS format")
	parser.add_argument("-f", "--folder", type=str, default="./data/", help="Folder to find mingrations in.")
	args = parser.parse_args()
	return args

def main():
	"""
	Reads command-line arguments and calls the run_migrations function.
	"""
	args = parse_args()
	
	if args.positional_offset and args.offset:
		parser.error("Only one of positional_arg or named_arg can be provided")
	run_migrations(offset_days=(args.offset or args.positional_offset), specific_date=args.date, migrations_dir=args.folder)

if __name__ == "__main__":
	main()