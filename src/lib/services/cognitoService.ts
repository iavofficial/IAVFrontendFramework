import { Auth } from "aws-amplify";
import { privLvls } from "../components/constants";
import { Credentials } from "../components/login/loginProvider";

let cognitoUser: any;

export function cognitoLogin(credentials: Credentials) {
    return Auth.signOut().then(() => (
        Auth.signIn(credentials.email.valueOf(), credentials.password.valueOf()).then(user => {
            cognitoUser = user;
            if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                delete user.challengeParam.userAttributes.email_verified;
                return new InvalidUserInformation(user.challengeParam.userAttributes);
            } else {
                return handleSessionResult(user);
            }
        })
    ));
}

export function cognitoLogout() {
    return Auth.signOut();
}

export function cognitoCheckIsAuthenticated() {
    return Auth.currentAuthenticatedUser().then(user => handleSessionResult(user));
}

export function cognitoCompletePassword(sessionUserAttributes: any, newPassword: String) {
    return Auth.completeNewPassword(cognitoUser, newPassword.valueOf(), sessionUserAttributes).then(user => {
        cognitoUser = user;
        return handleSessionResult(user);
    });
}

export function cognitoRefreshAccessToken() {
    return Auth.currentSession();
}

function handleSessionResult(user: any) {
    const session = user.getSignInUserSession();
    const jwtToken = session.getIdToken().getJwtToken();
    const groups = session.getIdToken().payload["cognito:groups"];
    const username = session.getIdToken().payload["cognito:username"];
    if (groups !== undefined) {
        let privLevel = -1;
        for (let group of groups) {
            let grpPrivLevl = -1;
            if (group === "USER") {
                grpPrivLevl = privLvls.USER;
            } else if (group === "ADMIN") {
                grpPrivLevl = privLvls.ADMIN;
            }
            if (grpPrivLevl > privLevel) {
                privLevel = grpPrivLevl;
            }
        }
        if (privLevel !== -1) {
            return new ValidUserInformation(jwtToken, username, privLevel);
        } else {
            throw new Error("UserGroupError"); // throw invalid user error if no legal group is assigned
        }
    } else {
        throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any groups)
    }
}

export class ValidUserInformation {
    constructor(public jwtToken: any, public username: string, public privLevel: number) {
    }
}

export class InvalidUserInformation {
    constructor(private _userAttributes: any) {
    }

    get userAttributes() {
        return this._userAttributes;
    }
}