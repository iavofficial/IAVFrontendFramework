mkdir ./decl_generated;
cp -R ./src/* ./decl_generated;
npx tsc --p tsconfig_generate_lib.json;

mkdir ./lib;
cp -R ./decl_generated/assets ./lib/assets;

if [ $? = 0 ]
then
    npx babel ./decl_generated/lib --out-dir ./lib --copy-files --extensions .ts,.tsx;
    npx babel ./decl_generated/links --out-dir . --copy-files;
    rm -R ./decl_generated;
else
    exit 1;
fi