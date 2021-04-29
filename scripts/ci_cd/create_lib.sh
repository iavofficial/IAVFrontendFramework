mkdir ./lib;

npx tsc;

if [ $? = 0 ]
then
    npx babel ./src/lib --out-dir ./lib/lib --extensions .ts,.tsx --copy-files;
    npx babel ./src/links --out-dir ./lib --extensions .ts,.tsx --copy-files
else
    exit 1;
fi