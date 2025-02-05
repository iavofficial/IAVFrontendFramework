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


# IMPORTANT: This script should be executed in the root folder of the repository.

# Define an array of files to copy
FILES=".gitignore CHANGELOG.md CONTRIBUTING.md LICENSE NOTICE.md README.md SBOM.spdx"

# Define source and target directories
SRC_DIR="./main"
TARGET_DIR="."

for file in $FILES
do
    # For generelization: Ensure target directory structure exists
    mkdir -p "$(dirname "$TARGET_DIR/$file")"

    # Copy file from source to target
    cp "$SRC_DIR/$file" "$TARGET_DIR/$file"
done