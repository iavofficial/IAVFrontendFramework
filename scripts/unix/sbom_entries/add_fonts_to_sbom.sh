#!/bin/bash

# List of SBOM files to process
SBOM_FILES=(
  "packages/frontend-framework/SBOM.spdx"
  "docs/SBOM.spdx"
  "packages/shared/SBOM.spdx"
  "packages/aws-authenticator/SBOM.spdx"
  "apps/dev_project/SBOM.spdx"
)

# SPDXID and JSON entry
SPDXID="SPDXRef-Package-roboto-regular-0.0.0"
ENTRY="\\    {\n      \"name\": \"Roboto-Regular\",\n      \"SPDXID\": \"SPDXRef-Package-roboto-regular-0.0.0\",\n      \"versionInfo\": \"0.0.0\",\n      \"packageFileName\": \"Roboto-Regular\",\n      \"description\": \"Download version of free fonts\",\n      \"downloadLocation\": \"https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf\",\n      \"homepage\": \"https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf\",\n      \"licenseDeclared\": \"Apache-2.0\"\n    },"

# Loop through each SBOM file
for SBOM_FILE in "${SBOM_FILES[@]}"; do
  echo "Processing SBOM file: $SBOM_FILE"

  # Validate that the file exists
  if [ ! -f "$SBOM_FILE" ]; then
    echo "Error: SBOM file not found at $SBOM_FILE"
    continue
  fi

  # Check if the entry already exists based on SPDXID
  if grep -q "\"SPDXID\": \"$SPDXID\"" "$SBOM_FILE"; then
    echo "Entry already exists in $SBOM_FILE. Skipping."
    continue
  fi

  # Insert the entry into the "packages" array
  echo "Inserting entry into the 'packages' array in $SBOM_FILE..."
  sed -e "/\"packages\": \[/a $ENTRY" "$SBOM_FILE" > "$SBOM_FILE.tmp" && mv "$SBOM_FILE.tmp" "$SBOM_FILE"

  # Verify whether sed operation was successful
  if [ $? -eq 0 ]; then
    echo "Entry successfully added to $SBOM_FILE."
  else
    echo "Failed to insert entry into $SBOM_FILE."
  fi
done
