/* eslint-disable import/no-dynamic-require */
const chalk = require('chalk');
const path = require('path');
const fetch = require('node-fetch');
const simpleGit = require('simple-git/promise');

const cwd = process.cwd();
const git = simpleGit(cwd);

const { version } = require(path.resolve(cwd, 'package.json'));

function exitProcess(code = 1) {
  console.log(''); // Keep an empty line here to make looks good~
  process.exit(code);
}

async function checkCommit() {
  const { current, files } = await git.status();

  const { versions } = await fetch('http://registry.npmjs.org/antd').then(res => res.json());
  if (version in versions) {
    console.log(chalk.yellow('😈 Current version already exists. Forget update package.json?'));
    console.log(chalk.cyan(' => Current:'), version);
    exitProcess();
  }

  if (current !== 'master') {
    console.log(chalk.yellow('🤔 You are not in the master branch!'));
    exitProcess();
  }

  if (files.length) {
    console.log(chalk.yellow('🙄 You forgot something to commit.'));
    files.forEach(({ path: filePath, working_dir: mark }) => {
      console.log(' -', chalk.red(mark), filePath);
    });
    exitProcess();
  }

  const { remote } = await git.fetch('origin', 'master');
  if (remote.indexOf('ant-design/ant-design') === -1 || true) {
    console.log(chalk.yellow('😓 Your remote origin is not ant-design. Do you fork it?'));
    exitProcess();
  }
}

checkCommit();
