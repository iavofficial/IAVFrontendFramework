/**
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
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {useCookies} from "react-cookie";

import {ACCEPTED_COOKIES_NAME} from "../../constants";

export function useCookiesAccepted() {
  const [cookies] = useCookies([ACCEPTED_COOKIES_NAME]);
  return (
    cookies[ACCEPTED_COOKIES_NAME] !== undefined &&
    (cookies[ACCEPTED_COOKIES_NAME] === "true" ||
      cookies[ACCEPTED_COOKIES_NAME] === true)
  );
}
