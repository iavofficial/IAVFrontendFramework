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

import {containsOneOrMoreGroups} from "@iavofficial/frontend-framework-shared/containsOneOrMoreGroups";
import {
  AuthError,
  confirmSignIn,
  fetchAuthSession,
  getCurrentUser,
  JWT,
  signIn,
  signOut,
} from "aws-amplify/auth";
import type {Credentials} from "@iavofficial/frontend-framework-shared/authenticatorModule";

export async function cognitoLogin(
  credentials: Credentials,
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[],
) {
  return await signIn({
    username: credentials.email.valueOf(),
    password: credentials.password.valueOf(),
  })
    .then((response) => {
      if (
        response.nextStep.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        return {};
      } else {
        return handleSessionResult(failOnNoLegalGroup, legalGroups);
      }
    })
    .catch((error: Error) => {
      throw new AuthError(error);
    });
}

export async function cognitoLogout() {
  return await signOut().catch((error: Error) => {
    throw new AuthError(error);
  });
}

export async function cognitoCheckIsAuthenticated(
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[],
) {
  return await getCurrentUser()
    .then((response) => {
      if (response.username) {
        return handleSessionResult(failOnNoLegalGroup, legalGroups);
      }
    })
    .catch((error: Error) => {
      throw new AuthError(error);
    });
}

export async function cognitoCompletePassword(
  newPassword: string,
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[],
) {
  return await confirmSignIn({challengeResponse: newPassword})
    .then((response) => {
      if (response.isSignedIn && response.nextStep.signInStep === "DONE") {
        return handleSessionResult(failOnNoLegalGroup, legalGroups);
      }
    })
    .catch((error: Error) => {
      throw new AuthError(error);
    });
}

export async function cognitoRefreshToken(
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[],
) {
  return await handleSessionResult(failOnNoLegalGroup, legalGroups).catch(
    (error: Error) => {
      throw new AuthError(error);
    },
  );
}

async function handleSessionResult(
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[],
  forceRefresh?: boolean,
) {
  return await fetchAuthSession({forceRefresh: forceRefresh})
    .then((response) => {
      const {tokens} = response;
      const userGroups = tokens?.idToken?.payload["cognito:groups"];
      const username = tokens?.idToken?.payload["cognito:username"] as string;
      const idToken = tokens?.idToken?.toString();
      const accessToken = tokens?.accessToken.toString();

      if (failOnNoLegalGroup) {
        if (!userGroups || !legalGroups) throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)

        if (!containsOneOrMoreGroups(userGroups as string[], legalGroups))
          throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)
      }

      return new ValidUserInformation(
        idToken!,
        accessToken!,
        username.toString(),
        userGroups as string[],
      );
    })
    .catch((error: Error) => {
      throw new AuthError(error);
    });
}

export class ValidUserInformation {
  public idToken: string;
  public accessToken: string;

  constructor(
    idToken: string,
    accessToken: string,
    public username: string,
    public userGroups: string[],
  ) {
    this.idToken = idToken;
    this.accessToken = accessToken;
  }
}
