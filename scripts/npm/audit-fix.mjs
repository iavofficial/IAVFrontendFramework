#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const docsDir = resolve(repoRoot, 'docs');
const passThroughArgs = process.argv.slice(2);

function run(label, command, args, options = {}) {
  console.log(`\n> ${label}`);
  console.log(`  ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repoRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('Apply npm audit fix for root and npm workspaces', 'npm', ['audit', 'fix', ...passThroughArgs]);

run('Apply npm audit fix in workspace packages via Turbo', 'npx', [
  'turbo',
  'run',
  'audit:fix',
  '--concurrency=1',
  '--',
  ...passThroughArgs,
]);

if (existsSync(resolve(docsDir, 'package.json'))) {
  run('Apply npm audit fix in docs', 'npm', ['audit', 'fix', ...passThroughArgs], { cwd: docsDir });
}
