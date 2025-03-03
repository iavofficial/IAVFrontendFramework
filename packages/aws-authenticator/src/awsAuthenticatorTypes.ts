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

import {
  UserData,
} from "@iavofficial/frontend-framework-shared/authenticationProvider";
import {AsyncThunk} from "@reduxjs/toolkit";
import {JWT} from "@aws-amplify/auth";

export interface JWTPojo {
  payload: JWT["payload"];
}

// The Redux store demands that objects in action payloads are POJOs
// (for example they cannot have functions).
export interface AWSUserData extends UserData {
  extras: {
    idToken: JWTPojo;
    accessToken: JWTPojo;
    groups: string[];
  };
}

export type AWSAuthenticatorExtras = {
  checkIsAuthenticated: AsyncThunk<void, void, {}>;
  completePassword: AsyncThunk<void, {newPassword: string}, {}>;
  refreshSession: AsyncThunk<void, void, {}>;
};