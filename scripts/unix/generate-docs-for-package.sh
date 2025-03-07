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

# IMPORTANT: This script should be executed in the context of packages.

DOCS_DIR="../../generated_docs/packages"
DOCS_DIST_DIR="docs/dist"

NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")

DOCS_TARGET_PATH="${DOCS_DIR}/${NAME}/${VERSION}"

mkdir -p $DOCS_TARGET_PATH

cp -r $DOCS_DIST_DIR/* $DOCS_TARGET_PATH

echo "Created docs for ${NAME} version ${VERSION}"
