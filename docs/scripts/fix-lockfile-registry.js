const fs = require("fs");

const lockfile = "package-lock.json";
const artifactoryHost = "https://artifactory.iav.com";
const npmjs = "https://registry.npmjs.org";

let content = fs.readFileSync(lockfile, 'utf8');

content = content.replace(new RegExp(artifactoryHost.replace(/\//g, "\\/"), "g"), npmjs);

fs.writeFileSync(lockfile, content);
