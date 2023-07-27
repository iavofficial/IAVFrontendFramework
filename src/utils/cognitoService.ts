import { Auth } from 'aws-amplify';
import { Credentials } from '../contexts/auth';
import { containsOneOrMoreGroups } from './groupChecker';

let cognitoUser: any;

export function cognitoLogin(
  credentials: Credentials,
  failOnNoLegalGroup: Boolean,
  legalGroups: string[]
) {
  return Auth.signOut().then(() =>
    Auth.signIn(
      credentials.email.valueOf(),
      credentials.password.valueOf()
    ).then((user) => {
      cognitoUser = user;
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        delete user.challengeParam.userAttributes.email_verified;
        return new InvalidUserInformation(user.challengeParam.userAttributes);
      } else {
        return handleSessionResult(user, failOnNoLegalGroup, legalGroups);
      }
    })
  );
}

export function cognitoLogout() {
  return Auth.signOut();
}

export function cognitoCheckIsAuthenticated(
  failOnNoLegalGroup: Boolean,
  legalGroups: string[]
) {
  return Auth.currentAuthenticatedUser().then((result) =>
    handleSessionResult(result, failOnNoLegalGroup, legalGroups)
  );
}

export function cognitoCompletePassword(
  sessionUserAttributes: any,
  newPassword: String,
  failOnNoLegalGroup: Boolean,
  legalGroups: string[]
) {
  return Auth.completeNewPassword(
    cognitoUser,
    newPassword.valueOf(),
    sessionUserAttributes
  ).then((user) => {
    cognitoUser = user;
    return handleSessionResult(user, failOnNoLegalGroup, legalGroups);
  });
}

export function cognitoRefreshAccessToken() {
  return Auth.currentSession();
}

function handleSessionResult(
  user: any,
  failOnNoLegalGroup: Boolean,
  legalGroups: string[]
) {
  const session = user.getSignInUserSession();
  const jwtToken = session.getIdToken().getJwtToken();
  const groups = session.getIdToken().payload['cognito:groups'];
  const username = session.getIdToken().payload['cognito:username'];
  if (failOnNoLegalGroup) {
    if (!groups) {
      throw new Error('UserGroupError'); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)
    }
    if (!containsOneOrMoreGroups(groups, legalGroups)) {
      throw new Error('UserGroupError'); // throw invalid user error (user is valid and authorized, but is not assigned any legal groups)
    }
  }
  return new ValidUserInformation(jwtToken, username, groups);
}

export class ValidUserInformation {
  constructor(
    public jwtToken: any,
    public username: string,
    public groups: string[]
  ) {}
}

export class InvalidUserInformation {
  constructor(private _userAttributes: any) {}

  get userAttributes() {
    return this._userAttributes;
  }
}
