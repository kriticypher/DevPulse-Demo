'use strict';

const fs = require('fs');
const path = require('path');
const semver = require('semver');

console.log('\n==================================================');
console.log('   DevPulse Demo Environment Setup & Verification  ');
console.log('==================================================\n');

let hasErrors = false;

// 1. Verify Node.js version
const currentVersion = process.version;
const requiredVersion = '>=16.0.0';
if (semver.satisfies(currentVersion, requiredVersion)) {
  console.log(`[PASS] Node.js version: ${currentVersion} (Satisfies ${requiredVersion})`);
} else {
  console.error(`[FAIL] Node.js version ${currentVersion} does not satisfy ${requiredVersion}`);
  hasErrors = true;
}

// 2. Verify kriti-devpulse package installation
try {
  const pkgJsonPath = require.resolve('kriti-devpulse/package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  console.log(`[PASS] kriti-devpulse package detected (version: ${pkg.version})`);
} catch (err) {
  console.error('[FAIL] kriti-devpulse is not installed in node_modules.');
  console.error('       Please execute: npm install');
  hasErrors = true;
}

// 3. Verify sample projects
const rootDir = path.resolve(__dirname, '..');
const demoProjects = [
  'demo-projects/healthy-project',
  'demo-projects/warning-project',
  'demo-projects/unhealthy-project'
];

for (const projectRel of demoProjects) {
  const fullPath = path.join(rootDir, projectRel);
  const pkgPath = path.join(fullPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    console.log(`[PASS] Sample project exists: ${projectRel}`);
  } else {
    console.error(`[FAIL] Missing package.json in ${projectRel}`);
    hasErrors = true;
  }
}

// 4. Verify output directories
const requiredDirs = ['reports', 'screenshots'];
for (const dirName of requiredDirs) {
  const dirPath = path.join(rootDir, dirName);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`[INFO] Created directory: ${dirName}/`);
  } else {
    console.log(`[PASS] Output directory present: ${dirName}/`);
  }
}

console.log('\n--------------------------------------------------');
if (hasErrors) {
  console.error('Setup completed with errors. Please check the logs above.');
  process.exit(1);
} else {
  console.log('DevPulse demo environment is completely ready!');
  console.log('You can now run:');
  console.log('  npm run demo:all          # Run all three demonstrations');
  console.log('  npm run demo:healthy      # Audit healthy project (Score ~100)');
  console.log('  npm run demo:warning      # Audit warning project (Score ~74)');
  console.log('  npm run demo:unhealthy    # Audit unhealthy project (Score ~30)');
  console.log('--------------------------------------------------\n');
}
