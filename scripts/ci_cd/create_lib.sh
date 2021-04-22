mkdir ./lib;
cp -R ./src/assets ./lib/assets;

npx tsc;

if [ $? = 0 ]
then
    npx babel ./src/components --out-dir ./lib/components --copy-files;
    npx babel ./src/contexts --out-dir ./lib/contexts --copy-files;
    npx babel ./src/links --out-dir . --copy-files;
    npx tsc --p ./generate_decl_tsconfig.json;
else
    exit 1;
fi