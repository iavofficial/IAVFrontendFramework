Xcopy src\assets lib\assets /i


npx babel src\components --out-dir lib\components --copy-files --extensions .ts,.tsx &^
npx babel src\contexts --out-dir lib\contexts --copy-files --extensions .ts,.tsx &^
npx babel src\links --out-dir lib --copy-files --extensions .ts,.tsx