mkdir ./build;

npx tsc;

if [ $? = 0 ]
then
    npx babel ./src/lib --out-dir ./build/lib --extensions .ts,.tsx --copy-files;
    npx babel ./src/links --out-dir ./build --extensions .ts,.tsx --copy-files;
    cp ./package.json ./build
    cp ./.npmrc ./build;
    cp ./README.md ./build;
else
    exit 1;
fi
