// scripts/check-hardcoded-stats.js
const fs = require('fs');
const path = require('path');

const STAT_PATTERNS = [
  /\b47,?000\+?\b/gi,
];

const IGNORED_PATHS = [
  'lib/site-stats.ts',
  'scripts',
  'node_modules',
  '.next',
  'pnpm-lock.yaml',
  'package-lock.json',
  'UPGRADE_PLAN.md'
];

function checkDirectory(dir, errors = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(process.cwd(), fullPath);

    if (IGNORED_PATHS.some(ignored => relPath.startsWith(ignored))) {
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkDirectory(fullPath, errors);
    } else if (/\.(tsx?|jsx?|json|md)$/i.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        STAT_PATTERNS.forEach(pattern => {
          if (pattern.test(line)) {
            errors.push({ file: relPath, line: idx + 1, content: line.trim() });
          }
        });
      });
    }
  }

  return errors;
}

const rootDir = process.cwd();
const errors = checkDirectory(rootDir);

if (errors.length > 0) {
  console.error('\n❌ Hardcoded statistics detected! Use SITE_STATS from lib/site-stats.ts instead:\n');
  errors.forEach(err => {
    console.error(`  ${err.file}:${err.line} -> "${err.content}"`);
  });
  console.error('\nBuild failed by data integrity check.\n');
  process.exit(1);
} else {
  console.log('✅ Data integrity check passed. All statistics reference SITE_STATS.');
  process.exit(0);
}
