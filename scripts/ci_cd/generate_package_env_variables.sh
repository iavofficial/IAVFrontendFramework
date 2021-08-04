{
    echo "NPM_PACKAGE_NAME=$(node -p "require('./package.json').name")"
    echo "NPM_PACKAGE_VERSION=$(node -p "require('./package.json').version")"
} >> build.env
