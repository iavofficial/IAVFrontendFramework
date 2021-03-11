if [[ ! -f package.json ]]; then
  echo "No package.json found! A package.json file is required to publish a package to GitLab's NPM registry."
  echo 'For more information, see https://docs.gitlab.com/ee/user/packages/npm_registry/#creating-a-project'
  exit 1
fi
NPM_PACKAGE_NAME=$(node -p "require('./package.json').name")
NPM_PACKAGE_VERSION=$(node -p "require('./package.json').version")
npm config set cafile ./ci_cd/ca-bundle-including-iav_gitlab.crt

echo SETUP
