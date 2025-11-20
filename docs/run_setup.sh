#!/bin/bash

# Build the project
echo "Building the project..."
mvn clean install -DskipTests

# Run the application in dev mode
echo "Starting Quarkus Dev Mode..."
mvn quarkus:dev
