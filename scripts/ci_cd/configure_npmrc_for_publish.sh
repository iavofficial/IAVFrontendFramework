# Write a new line and the authentication information to the .npmrc file.
echo $'\n' >> .npmrc
curl -s -u$artifactory_user:$artifactory_apikey https://artifactory.iav.com/artifactory/api/npm/npm-iav/auth/npm-iav-frontend | awk '{printf "//artifactory.iav.com/artifactory/:%s\n", $0}' >> .npmrc