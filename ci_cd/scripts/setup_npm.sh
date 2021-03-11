export NPM_PACKAGE_NAME=$(node -p "require('./package.json').name")
export NPM_PACKAGE_VERSION=$(node -p "require('./package.json').version")
npm config set cafile $IAV_CA_BUNDLE
