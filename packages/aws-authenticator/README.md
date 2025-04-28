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

# AWS Authenticator

[![license](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE)

This module adds **AWS Cognito authentication** to
the [IAV Frontend Framework](https://github.com/iavofficial/IAVFrontendFramework). It's
built on top of AWS Amplify and handles login, session management, and group-based access control.

### Install

```bash
npm install @iavofficial/frontend-framework-aws-authenticator
```

### Highlights

- Easy AWS Amplify integration via `configureAmplify` callback
- Optional group restriction with `legalGroups`
- React lifecycle support and prebuilt `awsAuthenticationView`
- Extra methods like `completePassword`, `refreshSession`, and `checkIsAuthenticated`

### Usage

Register the module using `PageAwsAuthenticator` and pass `awsAuthenticationView` to the `UILayer` for full integration.

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
