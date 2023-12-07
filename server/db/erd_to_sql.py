#!/usr/bin/env python3

def parse_erd(erd_string):
	"""
	Parses an ERD string and generates SQL table schema with specific defaults.

	Args:
		erd_string: The ERD string in the format specified in the prompt.

	Returns:
		A list of SQL CREATE TABLE statements for each entity and their relationships.
	"""

	tables = {}
	relationships = []

	for line in erd_string.splitlines():
		# print(f"{len(line), {line}}")
		if len(line) <= 0:
			continue
		if line[0] == "[":
			# Entity definition
			entity_name = line[1:-1]
			tables[entity_name] = {}
		elif line[0] == "*":
			# Entity attribute
			attribute_name, label = line[1:].split("{")
			label = label[:-1].strip()
			if "," in label:
				data_type, constraints = label.split(",")
				constraints = constraints.split("; ")
			else:
				data_type = label
				constraints = []
			tables[entity_name][attribute_name] = (data_type.strip(), [c.strip() for c in constraints])
		elif line[0:2] == "+-":
			# Many-to-one relationship
			left_entity, right_entity = line[2:].split(" ")
			relationships.append((left_entity, right_entity, "MANY_TO_ONE"))
		elif line[0:2] == "*-":
			# Many-to-many relationship
			left_entity, right_entity = line[2:].split(" ")
			relationships.append((left_entity, right_entity, "MANY_TO_MANY"))
		elif line[0:2] == "*+":
			# One-to-many relationship (implicit)
			left_entity, right_entity = line[2:].split(" ")
			relationships.append((left_entity, right_entity, "ONE_TO_MANY_IMPLICIT"))
		elif line[0:2] == "1-":
			# One-to-one relationship (implicit)
			left_entity, right_entity = line[2:].split(" ")
			relationships.append((left_entity, right_entity, "ONE_TO_ONE_IMPLICIT"))

	# Generate SQL CREATE TABLE statements
	sql_statements = []
	for entity_name, attributes in tables.items():
		sql_statement = f"CREATE TABLE IF NOT EXISTS {entity_name} (\n"
		sql_statement += f"  id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
		for attribute_name, (data_type, constraints) in attributes.items():
			sql_statement += f"  {attribute_name} {data_type} "
		for constraint in constraints:
			if constraint.upper() == "NOT NULL":
				sql_statement += "NOT NULL "
			elif constraint.upper().startswith("DEFAULT"):
				sql_statement += f"DEFAULT {constraint.split()[1]} "
		sql_statement += ",\n"
		sql_statement = sql_statement[:-2] + ");\n"
		sql_statements.append(sql_statement)

	# Generate SQL ALTER TABLE statements for relationships
	for left_entity, right_entity, relationship in relationships:
		if relationship == "MANY_TO_ONE":
			sql_statement = f"ALTER TABLE {left_entity} ADD COLUMN {right_entity}_id INTEGER REFERENCES {right_entity}(id);\n"
		elif relationship == "MANY_TO_MANY":
			sql_statement = f"CREATE TABLE IF NOT EXISTS {left_entity}_{right_entity} (\n"
			sql_statement += f"  {left_entity}_id INTEGER REFERENCES {left_entity}(id),\n"
			sql_statement += f"  {right_entity}_id INTEGER REFERENCES {right_entity}(id),\n"
			sql_statement += "  PRIMARY KEY ({left_entity}_id, {right_entity}_id)\n"
			sql_statement += ");\n"
			sql_statements.append(sql_statement)

	return sql_statements

import argparse

def main():
	parser = argparse.ArgumentParser(description="Parse an ERD file and generate SQL schema")
	parser.add_argument("erd_file", help="Path to the .er file")
	args = parser.parse_args()

	with open(args.erd_file, "r") as f:
		erd_string = f.read()

	sql_statements = parse_erd(erd_string)

	for statement in sql_statements:
		print(statement)

if __name__ == "__main__":
  main()