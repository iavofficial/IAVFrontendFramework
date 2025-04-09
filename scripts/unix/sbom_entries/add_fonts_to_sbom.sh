#!/bin/bash

# Path to the SBOM file
SBOM_FILE="packages/frontend-framework/SBOM.spdx"

# Font name and details
FONT_NAME="Roboto-Regular"
FONT_ENTRY=$(cat <<EOF
  {
    "name": "$FONT_NAME",
    "SPDXID": "SPDXRef-Package-roboto-regular-0.0.0",
    "versionInfo": "0.0.0",
    "packageFileName": "$FONT_NAME",
    "description": "Download version of free fonts",
    "downloadLocation": "https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf",
    "homepage": "https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf",
    "licenseDeclared": "Apache-2.0"
  },
EOF
)

# Check if the entry already exists
if grep -q "$FONT_NAME" "$SBOM_FILE"; then
    echo "Font $FONT_NAME is already present in the SBOM."
else
    echo "Adding $FONT_NAME to the SBOM..."
    sed -i "/\"packages\": \[/a $FONT_ENTRY" "$SBOM_FILE"
    echo "Font $FONT_NAME added to the SBOM."
fi
