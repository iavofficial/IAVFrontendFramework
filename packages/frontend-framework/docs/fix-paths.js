import {replaceInFile} from "replace-in-file";

replaceInFile({
    files: "dist/**/*.html",
    from: /src="\/assets\//g,
    to: 'src="./assets/',
}).catch(() => process.exit(1));
