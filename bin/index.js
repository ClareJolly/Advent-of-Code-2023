#!/usr/bin/env node
const inquirer = require('inquirer');
const chalk = require('chalk');
const init = require('../src/cli/commands/init')

const yargs = require('yargs')
const argv = yargs.argv

const commands = { init: { fn: init } }


const run = () => {
  const args = process.argv.slice(2)
  try {
    commands[args[0]].fn()
  } catch (e) {
    console.error(chalk.red('nope'))
  }

}




run()
