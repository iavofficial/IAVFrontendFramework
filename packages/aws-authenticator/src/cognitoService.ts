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
import {JWTPojo} from "./awsAuthenticatorTypes";
import { Credentials } from "@iavofficial/frontend-framework-shared/authenticatorModule";

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
      const idToken = tokens?.idToken;
      const accessToken = tokens?.accessToken;
      const groups = idToken?.payload["cognito:groups"];
      const username = idToken?.payload["cognito:username"] as string;

      if (failOnNoLegalGroup) {
        if (!groups || !legalGroups) throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)

        if (!containsOneOrMoreGroups(groups as string[], legalGroups))
          throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)
      }

      return new ValidUserInformation(
        idToken!,
        accessToken!,
        username.toString(),
        groups as string[],
      );
    })
    .catch((error: Error) => {
      throw new AuthError(error);
    });
}

export class ValidUserInformation {
  public idToken: JWTPojo;
  public accessToken: JWTPojo;

  constructor(
    idToken: JWT,
    accessToken: JWT,
    public username: string,
    public groups: string[],
  ) {
    this.idToken = {
      payload: idToken.payload,
    };
    this.accessToken = {
      payload: accessToken.payload,
    };
  }
}
