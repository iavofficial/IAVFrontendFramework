<!--
* Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
-->

# IAV Frontend Framework Documentation

## React Project

This is the IAV Frontend Framework, built using React.

### Structure

- Every new page should be wrapped in the `<Page>` component.
- You can use helper components like `<Title>`, `<SubTitle>`, and `<Text>` to create your own page structure.

### Adding a New Page

To add a new page:

1. Create a new page component (e.g., `MyPage.tsx`).
2. Wrap the content of the page in the `<Page>` component.
3. Add the page with a URI to the router in `layout.tsx`.

### Build

To build the project, run:

```bash
npm run build
