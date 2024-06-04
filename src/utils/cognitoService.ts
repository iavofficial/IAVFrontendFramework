import {
  signIn,
  signOut,
  fetchAuthSession,
  confirmSignIn,
  JWT,
  getCurrentUser,
  AuthError,
} from "aws-amplify/auth";
import { Credentials } from "../contexts/auth";
import { containsOneOrMoreGroups } from "./groupChecker";

export type ValidUserInfo = {
  idToken: JWT;
  accessToken: JWT;
  username: string;
  groups: string[];
};

export async function cognitoLogin(
  credentials: Credentials,
  failOnNoLegalGroup: boolean,
  legalGroups: string[]
) {
  try {
    const response = await signIn({
      username: credentials.email.valueOf(),
      password: credentials.password.valueOf(),
    });

    if (
      response.nextStep.signInStep ===
      "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
    ) {
      return {};
    } else {
      return handleSessionResult(failOnNoLegalGroup, legalGroups);
    }
  } catch (error: any) {
    throw new AuthError(error);
  }
}

export async function cognitoLogout() {
  try {
    return await signOut();
  } catch (error: any) {
    throw new AuthError(error);
  }
}

export async function cognitoCheckIsAuthenticated(
  failOnNoLegalGroup: boolean,
  legalGroups: string[]
) {
  try {
    let response = await getCurrentUser();

    if (response.username) {
      return await handleSessionResult(failOnNoLegalGroup, legalGroups);
    }
  } catch (error: any) {
    throw new AuthError(error);
  }
}
export async function cognitoCompletePassword(
  newPassword: string,
  failOnNoLegalGroup: boolean,
  legalGroups: string[]
) {
  try {
    let response = await confirmSignIn({ challengeResponse: newPassword });

    if (response.isSignedIn && response.nextStep.signInStep === "DONE")
      return handleSessionResult(failOnNoLegalGroup, legalGroups);
  } catch (error: any) {
    throw new AuthError(error);
  }
}

export async function cognitoRefreshToken() {
  try {
    return await fetchAuthSession({ forceRefresh: true });
  } catch (error: any) {
    throw new AuthError(error);
  }
}

async function handleSessionResult(
  failOnNoLegalGroup: boolean,
  legalGroups: string[]
) {
  try {
    let { tokens } = await fetchAuthSession();
    let idToken = tokens?.idToken;
    let accessToken = tokens?.accessToken;
    const groups = idToken?.payload["cognito:groups"];
    let username = idToken?.payload["cognito:username"];

    if (failOnNoLegalGroup) {
      if (!groups) throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)

      if (!containsOneOrMoreGroups(groups as string[], legalGroups))
        throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)
    }
    return {
      accessToken: accessToken,
      idToken: idToken,
      groups: groups,
      username: username,
    } as ValidUserInfo;
  } catch (error: any) {
    throw new AuthError(error);
  }
}
