npm config set proxy $HTTP_PROXY;

npm config set "@disa:registry" "${REPO_PROTOCOL}://${REPO_URL}/api/v4/projects/${REPO_PROJECT_ID}/packages/npm/";
npm config set "//${REPO_URL}/api/v4/projects/${REPO_PROJECT_ID}/packages/npm/:_authToken" "${REPO_DEPLOY_FRAMEWORK_AUTH_TOKEN}";

npm config rm proxy
npm config rm https-proxy
