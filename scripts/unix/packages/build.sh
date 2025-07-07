npx babel ./src --out-dir ./dist --extensions .ts,.tsx --copy-files
npx tsc --outDir ./dist

cp ../../LICENSE ./LICENSE
cp ../../NOTICE.md ./NOTICE.md

# Copy CSS assets
cp -R ../../packages/shared/assets/css ./dist/assets/css
# Copy image assets (e.g. authentication view background images)
cp -R ../../packages/shared/assets/png ./dist/png
cp -R ../../packages/shared/assets/svg ./dist/svgnpm