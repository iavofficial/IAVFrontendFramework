#!/bin/bash

# List of SBOM files to process
SBOM_FILES=(
  "packages/frontend-framework/SBOM.spdx"
  "docs/SBOM.spdx"
  "packages/shared/SBOM.spdx"
  "packages/aws-authenticator/SBOM.spdx"
  "apps/dev_project/SBOM.spdx"
)

# SPDXID and JSON entries
PACKAGE_SPDXID="SPDXRef-Package-roboto-regular-0.0.0"
PACKAGE_ENTRY="\\    {\n      \"name\": \"Roboto-Regular\",\n      \"SPDXID\": \"SPDXRef-Package-roboto-regular-0.0.0\",\n      \"versionInfo\": \"0.0.0\",\n      \"packageFileName\": \"Roboto-Regular\",\n      \"description\": \"Download version of free fonts\",\n      \"downloadLocation\": \"https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf\",\n      \"homepage\": \"https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf\",\n      \"licenseDeclared\": \"Apache-2.0\"\n    },"

RELATIONSHIP_ENTRY="\\    {\n      \"spdxElementId\": \"SPDXRef-Package-roboto-regular-0.0.0\",\n      \"relatedSpdxElement\": \"SPDXRef-Package-iavofficial.frontend-framework-1.0.0\",\n      \"relationshipType\": \"DEPENDENCY_OF\"\n    },"

# Function to insert an entry into a specific JSON array in the SBOM file
add_entry_to_array() {
  local sbom_file=$1
  local array_name=$2
  local entry=$3

  echo "Inserting entry into the '$array_name' array in $sbom_file..."

  # Insert the entry into the specified array
  sed -e "/\"$array_name\": \[/a $entry" "$sbom_file" > "$sbom_file.tmp" && mv "$sbom_file.tmp" "$sbom_file"

  # Verify if the `sed` operation was successful
  if [ $? -eq 0 ]; then
    echo "Entry successfully added to the '$array_name' array in $sbom_file."
  else
    echo "Failed to insert entry into the '$array_name' array in $sbom_file."
  fi
}

# Loop through each SBOM file and update `packages` and `relationships`
for SBOM_FILE in "${SBOM_FILES[@]}"; do
  echo "Processing SBOM file: $SBOM_FILE"

  # Validate that the file exists
  if [ ! -f "$SBOM_FILE" ]; then
    echo "Error: SBOM file not found at $SBOM_FILE"
    continue
  fi

  # Check if the package entry already exists
  if grep -q "\"SPDXID\": \"$PACKAGE_SPDXID\"" "$SBOM_FILE"; then
    echo "Package entry already exists in $SBOM_FILE. Skipping package entry addition."
  else
    # Add the package entry to the "packages" array
    add_entry_to_array "$SBOM_FILE" "packages" "$PACKAGE_ENTRY"
  fi

  # Check if the relationship entry already exists
  if grep -q "\"spdxElementId\": \"$PACKAGE_SPDXID\"" "$SBOM_FILE"; then
    echo "Relationship entry already exists in $SBOM_FILE. Skipping relationship entry addition."
  else
    # Add the relationship entry to the "relationships" array
    add_entry_to_array "$SBOM_FILE" "relationships" "$RELATIONSHIP_ENTRY"
  fi
done
