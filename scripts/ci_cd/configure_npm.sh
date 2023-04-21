npm config set proxy $HTTP_PROXY;

npm config set "@disa:registry" "${REPO_PROTOCOL}://${REPO_URL}/api/v4/projects/${REPO_PROJECT_ID}/packages/npm/";
npm config set "//${REPO_URL}/api/v4/projects/${REPO_PROJECT_ID}/packages/npm/:_authToken" "${REPO_DEPLOY_FRAMEWORK_AUTH_TOKEN}";

npm config set registry="http://registry.npmjs.org/"

npm config rm http-proxy
npm config rm https-proxy

npm config set fetch-retry-mintimeout 200000
npm config set fetch-retry-maxtimeout 1000000
