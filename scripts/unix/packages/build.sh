npx babel ./src --out-dir ./dist --extensions .ts,.tsx --copy-files
npx tsc --outDir ./dist

cp ./package.json ./dist/package.json
cp ../../LICENSE ./dist/LICENSE
cp ../../NOTICE.md ./dist/NOTICE.md