rm -R ./lib;
mkdir -p ./lib/assets && cp -R ./src/assets;
npx babel ./src/components --out-dir ./lib/components --copy-files;
