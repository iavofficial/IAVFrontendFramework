function getConfig() {
    let apiRoot = "https://tj25ai6jb4.execute-api.eu-central-1.amazonaws.com/stage/"; // (set)
    let domain = "localhost";
    let cognitoPoolId = "eu-central-1_NEZERq3VI"; // set
    let cognitoAppClientId = "35782dm4qcjcrajr3ls01d346i"; // set
    let region = "eu-central-1"; // (set)

    if (window.env) {
        if (window.env.API_ROOT) {
            apiRoot = window.env.API_ROOT;
        }
        if (window.env.DOMAIN) {
            domain = window.env.DOMAIN;
        }
        if (window.env.COGNITO_POOL) {
            cognitoPoolId = window.env.COGNITO_POOL;
        }
        if (window.env.COGNITO_APP_ID) {
            cognitoAppClientId = window.env.COGNITO_APP_ID;
        }
        if (window.env.REGION) {
            region = window.env.REGION;
        }
    }

    const config = {
        API_Root: apiRoot,
        DOMAIN: domain,
        COGNITO_POOL_ID: cognitoPoolId,
        COGNITO_APP_CLIENT_ID: cognitoAppClientId,
        REGION: region
    };

    return config;
}

export const config = getConfig();