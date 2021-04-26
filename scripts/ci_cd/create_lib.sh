mkdir ./decl_generated;
cp -R ./src/* ./decl_generated;
npx tsc --p tsconfig_generate_lib.json;

mkdir ./lib;
cp -R ./decl_generated/assets ./lib/assets;

if [ $? = 0 ]
then
    npx babel ./decl_generated/components --out-dir ./lib/components --copy-files --extensions .ts,.tsx;
    npx babel ./decl_generated/contexts --out-dir ./lib/contexts --copy-files --extensions .ts,.tsx;
    npx babel ./decl_generated/services --out-dir ./lib/services --copy-files --extensions .ts,.tsx;
    npx babel ./decl_generated/links --out-dir . --copy-files;
    rm -R ./decl_generated;
else
    exit 1;
fi