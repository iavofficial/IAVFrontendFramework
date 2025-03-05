npx babel ./src --out-dir ./dist --extensions .ts,.tsx --copy-files
npx tsc --outDir ./dist

cp ../../LICENSE ./LICENSE
cp ../../NOTICE.md ./NOTICE.md