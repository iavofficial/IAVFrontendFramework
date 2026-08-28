const fs = require("fs");

const lockfile = "package-lock.json";
const npmjs = "https://registry.npmjs.org/";

let content = fs.readFileSync(lockfile, 'utf8');

content = content
  .replace(
    /https:\/\/artifactory\.iav\.com\/artifactory\/api\/npm\/npm\//g,
    npmjs,
  )
  .replace(
    /https:\/\/registry\.npmjs\.org\/artifactory\/api\/npm\/npm\//g,
    npmjs,
  )
  .replace(
    /https:\/\/portal\.partner\.iavtech\.net\/F5Networks-SSO-Req[^\s"]*/g,
    npmjs,
  );

fs.writeFileSync(lockfile, content);
