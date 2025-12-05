import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const lockfilePath = path.join(__dirname, '..', 'package-lock.json');

if (!fs.existsSync(lockfilePath)) {
    console.log('package-lock.json not found, skipping registry fix');
    process.exit(0);
}

const content = fs.readFileSync(lockfilePath, 'utf8');

const replaced = content
    .replace(/https:\/\/artifactory\.iav\.com\/artifactory\/api\/npm\/npm\//g, 'https://registry.npmjs.org/')
    .replace(/https:\/\/portal\.partner\.iavtech\.net\/F5Networks-SSO-Req[^\s"]*/g, 'https://registry.npmjs.org/');

if (content !== replaced) {
    fs.writeFileSync(lockfilePath, replaced);
    console.log('✅ Rewrote Artifactory URLs in package-lock.json');
} else {
    console.log('ℹ️ No Artifactory URLs found in package-lock.json – nothing to do.');
}
