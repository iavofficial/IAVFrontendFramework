<!--
 Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 SPDX-License-Identifier: Apache-2.0
-->

# Shared

[![license](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE)

The `shared` folder contains code that is reused across multiple modules of the IAV Frontend Framework.

It includes utilities, constants, types, and helper functions that are **independent** of specific modules but are
essential for consistent behavior throughout the framework.

### Purpose

- Avoid duplication of common logic
- Ensure consistency between modules
- Simplify maintenance and updates

### Usage

Code inside `shared` is **imported directly** by other modules.  
Changes here can affect multiple parts of the framework, so please edit with care.

## License

This project is licensed under the **Apache-2.0** license. The full license text is included in
the [root of the repository](./LICENSE).

## SBOM

As this project is a monorepo, the SBOM.spdx files are contained inside the specific package folders. You can find these
folders inside the packages folder.

## Contributing

Contributions are welcome! Please read
the [contributing guidelines](https://iavofficial.github.io/IAVFrontendFramework/CONTRIBUTING.md) before submitting a
pull
request.
