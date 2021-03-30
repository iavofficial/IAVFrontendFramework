rm -R ./lib && mkdir ./lib;
cp -R ./src/assets ./lib/assets;
npx babel ./src/components --out-dir ./lib/components --copy-files;
npx babel ./src/links --out-dir . --copy-files;
