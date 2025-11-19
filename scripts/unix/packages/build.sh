npx babel ./src --out-dir ./dist --extensions .ts,.tsx --copy-files
npx tsc --outDir ./dist

cp ../../LICENSE ./LICENSE
cp ../../NOTICE.md ./NOTICE.md

# # Copy CSS assets
 cp -R ../../packages/shared/css ./dist/css
# # Copy image assets (e.g. authentication view background images)
 cp -R ../../packages/shared/assets/img ./dist/img
