#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const docsDir = resolve(repoRoot, 'docs');

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

run('Update root package.json dependency ranges to latest minor versions', 'npx', [
  '-y',
  'npm-check-updates',
  '--target',
  'minor',
  '-u',
]);

run('Update workspace package.json dependency ranges to latest minor versions via Turbo', 'npx', [
  'turbo',
  'run',
  'deps:update:minor',
  '--concurrency=1',
]);

if (existsSync(resolve(docsDir, 'package.json'))) {
  run('Update docs package.json dependency ranges to latest minor versions', 'npx', [
    '-y',
    'npm-check-updates',
    '--target',
    'minor',
    '-u',
  ], { cwd: docsDir });
}

run('Refresh root package-lock.json', 'npm', ['install']);

if (existsSync(resolve(docsDir, 'package.json'))) {
  run('Refresh docs package-lock.json', 'npm', ['install'], { cwd: docsDir });
}
