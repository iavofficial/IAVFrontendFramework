#npm config set "@iav:registry" "https://artifactory.iav.com/artifactory/npm-iav";
#npm config set "https://artifactory.iav.com/artifactory/npm-iav" "${artifactory_token}";

# npm config set registry="http://registry.npmjs.org/"
#npm config set registry https://artifactory.iavgroup.local/artifactory/api/npm/npm-remote/

# npm config rm http-proxy
# npm config rm https-proxy

# npm config set fetch-retry-mintimeout 200000
# npm config set fetch-retry-maxtimeout 1000000

# Write a new line and the authentication information to the .npmrc file.
echo $'\n' > .npmrc
#curl -u$artifactory_user:$artifactory_apikey https://artifactory.iav.com/artifactory/api/npm/auth >> .npmrc
curl -s -u$artifactory_user:$artifactory_apikey https://artifactory.iav.com/artifactory/api/npm/auth | awk '{printf "https://artifactory.iav.com/artifactory/api/npm/auth:%s", $0}' >> output_file.txt