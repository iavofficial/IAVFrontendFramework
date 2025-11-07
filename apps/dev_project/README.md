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

# Development Project

[![license](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE)

The IAV Frontend Framework repository includes a **development project** to test and observe changes during framework
development.

Since the repository is a **monorepo** managed by **Turborepo**, you can build the framework and start the development
project with a single command.

### How to Start

1. Clone the repository and navigate to its root folder.

2. Run:

```bash
npm run dev
```

3. The framework and the development project will be built automatically.  
   This may take a few minutes on the first run.

4. Once the build is complete, you can access the **development application** in your web browser.

### Notes

- You can edit both the **framework** and the **development project** while it's running.
- Changes will be picked up automatically, allowing you to gain a deeper understanding of how the framework works.

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
