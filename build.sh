#!/bin/bash
# Build script to handle macOS metadata files on external drives

# Clean metadata files before build
echo "Cleaning macOS metadata files..."
find . -name "._*" -type f -delete 2>/dev/null
dot_clean -m . 2>/dev/null

# Run Maven build
echo "Running Maven build..."
mvn clean install

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed. Trying again with aggressive cleanup..."
    # Clean target and try again
    rm -rf target
    find . -name "._*" -type f -delete 2>/dev/null
    mvn clean install
fi
