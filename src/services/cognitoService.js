import { Auth } from "aws-amplify";

export function cognitoCheckIsAuthenticated() {
    return Auth.currentAuthenticatedUser().then(user => handleSessionResult(user));
}

function handleSessionResult(user) {
    const session = user.getSignInUserSession();
    const jwtToken = session.getIdToken().getJwtToken();
    const groups = session.getIdToken().payload['cognito:groups'];
    const username = session.getIdToken().payload['cognito:username'];
    if (groups !== undefined) {
        let privLevel = -1;
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            let grpPrivLevl;
            if (group === 'USER') {
                grpPrivLevl = 1;
            } else if (group === 'ADMIN') {
                grpPrivLevl = 2;
            }
            if (grpPrivLevl > privLevel) {
                privLevel = grpPrivLevl;
            }
        }
        if (privLevel === -1) {
            throw new Error("UserGroupError");
        } else {
            let customerId = user.attributes["custom:customerId"];
            const result = {
                jwtToken: jwtToken,
                user: username,
                customerId: customerId,
                privileges: privLevel,
            };
            return result;
        }
    } else {
        // throw invalid user error (user is valid and authorized, but is not assigned any groups)
        throw new Error("UserGroupError");
    }
}

/*export function test() {
    return innerTest().then(value => {
        throw new Error("Test error.");
    });
}

async function innerTest() {
    return new Promise(resolve => resolve("first"));
}*/