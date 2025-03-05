# Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
# http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# 
# SPDX-License-Identifier: Apache-2.0

#!/bin/bash

# IMPORTANT: This file only takes packages with a scope (for example @iav-ff-test-1/frontend-framework) into account.
# IMPORTANT: This script should be executed in the root folder of the repository.

SOURCE_DIR="main/generated_docs/packages"
DEST_DIR="generated_docs/packages"

# Deletes files in root generated docs which do not exist in main generated docs and
# copies (also overwrites) the other files.
rsync -av --exclude="packages" --delete main/generated_docs/* generated_docs/

# Copy all version folders to root generated documentation (and overwrite if necessary)
for scope in "$SOURCE_DIR"/*; do
    if [ -d "$scope" ]; then
        scope_name=$(basename "$scope")
        
        # Create the scope folder in the destination if it does not exist
        mkdir -p "$DEST_DIR/$scope_name"

        # Iterate over packages within the scope
        for package in "$scope"/*; do
            if [ -d "$package" ]; then
                package_name=$(basename "$package")
                
                # Create the package folder in the destination if it does not exist
                mkdir -p "$DEST_DIR/$scope_name/$package_name"

                # Copy version folders, overwriting existing ones
                for version in "$package"/*; do
                    if [ -d "$version" ]; then
                        version_name=$(basename "$version")
                        # Delete version folder if it exists
                        rm -rf "$DEST_DIR/$scope_name/$package_name/$version_name"
                        # Copy the version folder to root generated documentation
                        cp -r "$SOURCE_DIR/$scope_name/$package_name/$version_name" "$DEST_DIR/$scope_name/$package_name/"
                        echo "Copied $SOURCE_DIR/$scope_name/$package_name/$version_name to $DEST_DIR/$scope_name/$package_name/"
                    fi
                done
            fi
        done
    fi
done

rm -rf main

git add .
git commit -m "chore: Deploy updated documentation"
git push origin gh-pages