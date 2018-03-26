#!/usr/bin/env node
'use strict';

const program = require('commander');
const pkg = require('./package.json');
const chalk = require('chalk');
const fs = require('fs-extra');
const { log } = console


program
    .version(pkg.version)
    .option("-v, --version", pkg.version)

program
    .command('init [env]')
    .description('init rosmaro try')
    .option("-u, --url <url>", "get graph from a url")
    .action((env, options) => {
        log(options.url)
        log(chalk.blue.bold('WIP'));
    });

program
    .command('add <nodeName>')
    .description('add node to ./handler/all.js file and generate a template with nodeName.js')
    .action(nodeName => {
        log(chalk.red("Generating ", nodeName))
    })

program
    .command('update')
    .description('Update ./handler from graph.json')
    .action(() => {
        log(chalk.blue.bold('starting...'))
        // check if graph.json is present
        const graph = fs.readJsonSync('./graph.json', { throws: false })
        if(!graph)
            log(chalk.red.bold("graph.json"),"was not found or dose not contain Json")
        else {
            // if pragh object was detected succesfuly
            
        }
    })
program.parse(process.argv);

