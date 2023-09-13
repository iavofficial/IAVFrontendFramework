mkdir ./build;

npx tsc --outDir ./build;

if [ $? = 0 ]
then
    npx babel ./src --out-dir ./build --extensions .ts,.tsx --copy-files;
else
    exit 1;
fi