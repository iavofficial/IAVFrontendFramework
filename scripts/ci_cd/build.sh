mkdir ./build;

npx tsc;

if [ $? = 0 ]
then
    npx babel ./src --out-dir ./build --extensions .ts,.tsx --copy-files;
else
    exit 1;
fi