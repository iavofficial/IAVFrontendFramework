Xcopy src decl_generated /e /i
call npx tsc --p tsconfig_generate_lib.json

rmdir /S /q lib
Xcopy decl_generated\assets lib\assets /e /i

call npx babel decl_generated\components --out-dir lib\components --copy-files --extensions .ts,.tsx
call npx babel decl_generated\contexts --out-dir lib\contexts --copy-files --extensions .ts,.tsx
call npx babel decl_generated\services --out-dir lib\services --copy-files --extensions .ts,.tsx
call npx babel decl_generated\links --out-dir lib --copy-files

rmdir /S /q decl_generated