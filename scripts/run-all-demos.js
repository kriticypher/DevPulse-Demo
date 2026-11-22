'use strict';

const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const cliBinPath = path.join(rootDir, 'node_modules', 'kriti-devpulse', 'bin', 'devpulse.js');

const projects = [
  {
    key: 'healthy',
    title: 'Demo 1: Healthy Node.js Microservice',
    path: path.join(rootDir, 'demo-projects', 'healthy-project'),
    description: 'A fully configured project with complete metadata, clean dependencies, documentation, and tooling.',
    expectedScore: '100 (Grade A)',
    reportFile: path.join(rootDir, 'reports', 'healthy-project-report.json'),
  },
  {
    key: 'warning',
    title: 'Demo 2: Warning Project (Technical Debt)',
    path: path.join(rootDir, 'demo-projects', 'warning-project'),
    description: 'An active project with duplicate dependencies, unused packages, missing engine declarations, and moderate file size warnings.',
    expectedScore: '~74 (Grade C)',
    reportFile: path.join(rootDir, 'reports', 'warning-project-report.json'),
  },
  {
    key: 'unhealthy',
    title: 'Demo 3: Unhealthy Project (Critical Issues)',
    path: path.join(rootDir, 'demo-projects', 'unhealthy-project'),
    description: 'A neglected project missing README/LICENSE/.gitignore, containing dangerous version ranges, deprecated libraries, and insecure scripts.',
    expectedScore: '~30 (Grade F)',
    reportFile: path.join(rootDir, 'reports', 'unhealthy-project-report.json'),
  },
];

console.log('\n================================================================');
console.log('            DevPulse Comprehensive Demonstration Suite           ');
console.log('        Auditing Real Node.js Projects with kriti-devpulse       ');
console.log('================================================================\n');
console.log('This runner executes the published "kriti-devpulse" CLI auditor against');
console.log('three representative Node.js sample projects to demonstrate how DevPulse');
console.log('evaluates health scores and detects real-world project risks.\n');

const results = [];

for (let i = 0; i < projects.length; i++) {
  const p = projects[i];
  console.log(`\n────────────────────────────────────────────────────────────────`);
  console.log(`[${i + 1}/${projects.length}] ${p.title}`);
  console.log(`Path: ${p.path}`);
  console.log(`Context: ${p.description}`);
  console.log(`Expected Result: ${p.expectedScore}`);
  console.log(`────────────────────────────────────────────────────────────────\n`);

  // Execute devpulse audit in terminal mode
  const auditProc = spawnSync(process.execPath, [cliBinPath, 'audit', p.path], {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
  });

  // Also refresh JSON report
  spawnSync(process.execPath, [cliBinPath, 'audit', p.path, '--output', 'json', '--file', p.reportFile], {
    cwd: rootDir,
    stdio: 'pipe',
    env: process.env,
  });

  // Extract score for the summary
  let scoreText = 'Unknown';
  let gradeText = 'N/A';
  try {
    const reportData = require(p.reportFile);
    scoreText = `${reportData.score.value}/100`;
    gradeText = `${reportData.score.grade} (${reportData.score.label})`;
  } catch (err) {
    // If JSON read fails
  }

  results.push({
    title: p.title.split(':')[1].trim(),
    score: scoreText,
    grade: gradeText,
    exitCode: auditProc.status,
    status: auditProc.status === 0 ? 'Completed' : 'Failed',
  });
}

console.log('\n================================================================');
console.log('                  Demonstration Run Summary                      ');
console.log('================================================================\n');

console.table(results);

console.log('JSON reports saved to:');
projects.forEach(p => console.log(` - ${path.relative(rootDir, p.reportFile)}`));

console.log('\nDemonstration suite execution finished successfully.\n');
