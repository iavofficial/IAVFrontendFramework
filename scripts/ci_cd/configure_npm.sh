npm config set "@iav:registry" "https://artifactory.iav.com/artifactory/npm-iav";
npm config set "https://artifactory.iav.com/artifactory/npm-iav" "${artifactory_token}";

# npm config set registry="http://registry.npmjs.org/"
npm config set registry https://artifactory.iavgroup.local/artifactory/api/npm/npm-remote/

# npm config rm http-proxy
# npm config rm https-proxy

# npm config set fetch-retry-mintimeout 200000
# npm config set fetch-retry-maxtimeout 1000000
