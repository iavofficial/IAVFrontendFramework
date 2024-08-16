import {AuthError, confirmSignIn, fetchAuthSession, getCurrentUser, JWT, signIn, signOut,} from "aws-amplify/auth";
import {Credentials} from "../contexts/auth";
import {containsOneOrMoreGroups} from "./groupChecker";

export async function cognitoLogin(
  credentials: Credentials,
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[]
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
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[]
) {
  try {
    const response = await getCurrentUser();

    if (response.username) {
      return await handleSessionResult(failOnNoLegalGroup, legalGroups);
    }
  } catch (error: any) {
    throw new AuthError(error);
  }
}
export async function cognitoCompletePassword(
  newPassword: string,
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[]
) {
  try {
    const response = await confirmSignIn({ challengeResponse: newPassword });

    if (response.isSignedIn && response.nextStep.signInStep === "DONE")
      return handleSessionResult(failOnNoLegalGroup, legalGroups);
  } catch (error: any) {
    throw new AuthError(error);
  }
}

export async function cognitoRefreshToken(
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[]
) {
  try {
    return await handleSessionResult(failOnNoLegalGroup, legalGroups);
  } catch (error: any) {
    throw new AuthError(error);
  }
}

async function handleSessionResult(
  failOnNoLegalGroup?: boolean,
  legalGroups?: string[],
  forceRefresh?: boolean
) {
  try {
    const { tokens } = await fetchAuthSession({ forceRefresh: forceRefresh });
    const idToken = tokens?.idToken;
    const accessToken = tokens?.accessToken;
    const groups = idToken?.payload["cognito:groups"];
    const username = idToken?.payload["cognito:username"];

    if (failOnNoLegalGroup) {
      if (!groups || !legalGroups) throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)

      if (!containsOneOrMoreGroups(groups as string[], legalGroups))
        throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)
    }

    return new ValidUserInformation(
      idToken!,
      accessToken!,
      username?.toString()!,
      groups as string[]
    );
  } catch (error: any) {
    throw new AuthError(error);
  }
}
export class ValidUserInformation {
  constructor(
    public idToken: JWT,
    public accessToken: JWT,
    public username: string,
    public groups: string[]
  ) {}
}
