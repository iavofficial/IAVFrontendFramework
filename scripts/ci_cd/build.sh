mkdir ./build;

npx tsc;

if [ $? = 0 ]
then
    npx babel ./src --out-dir ./build --extensions .ts,.tsx --copy-files;
    cp ./package.json ./build;
    cp ./README.md ./build;
else
    exit 1;
fi
