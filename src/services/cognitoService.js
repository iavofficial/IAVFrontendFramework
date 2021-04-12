import { Auth } from "aws-amplify";
import { privLvls } from "../components/constants";

let cognitoUser;

export function cognitoLogin(credentials) {
    return Auth.signOut().then(() => (
        Auth.signIn(credentials.email, credentials.password).then(user => {
            cognitoUser = user;
            if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                delete user.challengeParam.userAttributes.email_verified;
                return ({
                    userAttributes: user.challengeParam.userAttributes
                });
            } else {
                return handleSessionResult(user);
            }
        })
    ))
}

export function cognitoLogout() {
    return Auth.signOut();
}

export function cognitoCheckIsAuthenticated() {
    return Auth.currentAuthenticatedUser().then(user => handleSessionResult(user));
}

export function cognitoCompletePassword(sessionUserAttributes, newPassword) {
    return Auth.completeNewPassword(cognitoUser, newPassword, sessionUserAttributes).then(user => {
        cognitoUser = user;
        return handleSessionResult(user);
    })
}

export function cognitoRefreshAccessToken() {
    Auth.currentSession();
}

function handleSessionResult(user) {
    const session = user.getSignInUserSession();
    const jwtToken = session.getIdToken().getJwtToken();
    const groups = session.getIdToken().payload["cognito:groups"];
    const username = session.getIdToken().payload["cognito:username"];
    if (groups !== undefined) {
        let privLevel = -1;
        for (let group of groups) {
            let grpPrivLevl;
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
            let customerId = user.attributes["custom:customerId"];
            return {
                jwtToken: jwtToken,
                user: username,
                customerId: customerId,
                privileges: privLevel,
            };
        } else {
            throw new Error("UserGroupError"); // throw invalid user error if no legal group is assigned
        }
    } else {
        throw new Error("UserGroupError"); // throw invalid user error (user is valid and authorized, but is not assigned any groups)
    }
}