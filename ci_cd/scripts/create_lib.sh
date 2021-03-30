rm -R ./lib;
mkdir -p ./lib/assets && cp -R ./src/assets ./lib/assets;
npx babel ./src/components --out-dir ./lib/components --copy-files;
npx babel ./src/links --out-dir ./lib --copy-files;
