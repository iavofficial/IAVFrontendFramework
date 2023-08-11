# Write a new line and the authentication information to the .npmrc file.
echo $'\n' >> .npmrc
curl -s -u$artifactory_user:$artifactory_apikey http://<ARTIFACTORY_SERVER_DOMAIN>:8081/artifactory/api/npm/npm-repo/auth/@npm-iav-frontend | awk '{printf "//artifactory.iav.com/artifactory/:%s\n", $0}' >> .npmrc