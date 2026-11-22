'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const cliBin = path.join(rootDir, 'node_modules', 'kriti-devpulse', 'bin', 'devpulse.js');
const tmpReport = path.join(rootDir, 'reports', 'test-temp-report.json');

console.log('Running automated verification suite on sample projects...\n');

try {
  // 1. Verify Healthy Project
  console.log('Testing: Healthy Project...');
  const healthyProc = spawnSync(process.execPath, [
    cliBin,
    'audit',
    path.join(rootDir, 'demo-projects', 'healthy-project'),
    '-o', 'json',
    '-f', tmpReport
  ], {
    encoding: 'utf8',
    cwd: rootDir
  });
  assert.strictEqual(healthyProc.status, 0, 'Healthy project audit process should exit with code 0');
  const healthyReport = JSON.parse(fs.readFileSync(tmpReport, 'utf8'));
  assert.strictEqual(healthyReport.score.value, 100, 'Healthy project score should be 100');
  assert.strictEqual(healthyReport.score.grade, 'A', 'Healthy project grade should be A');
  assert.strictEqual(healthyReport.findings.missingFiles.length, 0, 'Healthy project should have 0 missing files');
  console.log('✔ Healthy project verification passed: Score 100/100 (Grade A)\n');

  // 2. Verify Warning Project
  console.log('Testing: Warning Project...');
  const warnProc = spawnSync(process.execPath, [
    cliBin,
    'audit',
    path.join(rootDir, 'demo-projects', 'warning-project'),
    '-o', 'json',
    '-f', tmpReport
  ], {
    encoding: 'utf8',
    cwd: rootDir
  });
  assert.strictEqual(warnProc.status, 0, 'Warning project audit process should exit with code 0');
  const warnReport = JSON.parse(fs.readFileSync(tmpReport, 'utf8'));
  assert.ok(warnReport.score.value >= 70 && warnReport.score.value <= 80, 'Warning project score should be in 70-80 range');
  assert.strictEqual(warnReport.score.grade, 'C', 'Warning project grade should be C');
  assert.ok(warnReport.findings.dependencyWarnings.length > 0, 'Warning project should have duplicate dependency warnings');
  assert.ok(warnReport.findings.unusedDependencies.length > 0, 'Warning project should have unused dependencies');
  console.log(`✔ Warning project verification passed: Score ${warnReport.score.value}/100 (Grade C)\n`);

  // 3. Verify Unhealthy Project
  console.log('Testing: Unhealthy Project...');
  const unProc = spawnSync(process.execPath, [
    cliBin,
    'audit',
    path.join(rootDir, 'demo-projects', 'unhealthy-project'),
    '-o', 'json',
    '-f', tmpReport
  ], {
    encoding: 'utf8',
    cwd: rootDir
  });
  assert.strictEqual(unProc.status, 0, 'Unhealthy project audit process should exit with code 0');
  const unReport = JSON.parse(fs.readFileSync(tmpReport, 'utf8'));
  assert.ok(unReport.score.value <= 40, 'Unhealthy project score should be <= 40');
  assert.strictEqual(unReport.score.grade, 'F', 'Unhealthy project grade should be F');
  assert.ok(unReport.findings.dependencyIssues.length > 0, 'Unhealthy project should flag dangerous version specifier');
  assert.ok(unReport.findings.scriptIssues.length > 0, 'Unhealthy project should flag dangerous scripts');
  assert.ok(unReport.findings.largeFiles.length > 0, 'Unhealthy project should flag oversized files');
  console.log(`✔ Unhealthy project verification passed: Score ${unReport.score.value}/100 (Grade F)\n`);

  console.log('All verification tests passed successfully!');
} finally {
  if (fs.existsSync(tmpReport)) {
    fs.unlinkSync(tmpReport);
  }
}
