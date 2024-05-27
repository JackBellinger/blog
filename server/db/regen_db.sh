#!/usr/bin/env bash

# ARGUMENTS
# timestamp for which data 

# Customize these variables for your project
database_name="blog.db"	 # Name of your SQLite database file
backup_path="./backups"			 # Path to store database backups

# Create backup directory if it doesn't exist
mkdir -p "$backup_path"

# Backup the existing database
mv "$database_name" "$backup_path/$(date +%Y%m%d%H%M%S)_$database_name"

# Create a new, empty database
sqlite3 "$database_name" ".quit"	# SQLite command to create a new database

# run all migrations
echo "Running all migrations"
python ./update_db.py --date "00000000000000"


# # Run migrations with timestamps before the target_timestamp (if provided)
# if [[ ! -z "$target_timestamp" ]]; then
# 	target_date="${target_timestamp:0:8}"
# 	for migration_file in ./migrations/*.sql; do
# 		migration_timestamp="${migration_file:13:8}"	# Extract timestamp from filename
# 		if [[ "$migration_timestamp" < "$target_date" ]]; then
# 			echo "Migrating: $migration_file"
# 			sqlite3 "$database_name" < "$migration_file"
# 		fi
# 	done
# else
# 	# Run all migrations if no target_timestamp
# 	for migration_file in ./migrations/*.sql; do
# 		echo "Migrating: $migration_file"
# 		sqlite3 "$database_name" < "$migration_file"
# 	done
# fi

# # Load data from ./data directory

# # Get the target timestamp from the first argument (optional)
# target_timestamp="${1:-}"

# # If a timestamp is provided, validate it
# if [[ ! -z "$target_timestamp" ]]; then
# 	# Check if the format is valid SQL timestamp
# 	if ! [[ "$target_timestamp" =~ ^[0-9]{14} ]]; then
# 		echo "Invalid timestamp format. Please provide a valid SQL timestamp (YYYYMMDDHHMMSS)."
# 		exit 1
# 	fi
# fi
# # Find the data file closest earlier than the timestamp (or latest if none)
# data_file=""
# if [[ -z "$target_timestamp" ]]; then
# 	# Use most recent file
# 	data_file=$(ls -t ./data/*.sql | head -n 1)
# else
# 	# Extract date portion from timestamp
# 	target_date="${target_timestamp:0:8}"

# 	# Find files with timestamps on the same day
# 	same_day_files=$(ls -1 ./data/"$target_date"_*.sql)

# 	if [[ -z "$same_day_files" ]]; then
# 		echo "No data file found with a timestamp on the same day as '$target_timestamp'."
# 		exit 1
# 	fi

# 	# Choose the closest earlier file
# 	data_file=$(echo "$same_day_files" | grep -v "$target_timestamp" | tail -n 1)
# 	if [[ -z "$data_file" ]]; then
# 		# If no earlier file, use the earliest one on the same day
# 		data_file=$(echo "$same_day_files" | head -n 1)
# 	fi
# fi

# # Load the chosen data file
# echo "Loading data: $data_file"
# sqlite3 "$database_name" < "$data_file"

# echo "Database operations completed successfully!"