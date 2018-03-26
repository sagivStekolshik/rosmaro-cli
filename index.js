#!/usr/bin/env node
'use strict';

const program = require('commander');
const pkg = require('./package.json');
const chalk = require('chalk');
const {log} = console

program
    .version(pkg.version)
    .option("-v, --version", pkg.version)

program
    .command('init [env]')
    .description('init rosmaro try')
    .action(env => {
        log(chalk.blue('Hello') + ' World');
        
    });


program.parse(process.argv);

