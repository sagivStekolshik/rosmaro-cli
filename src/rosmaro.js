
'use strict';

import program from 'commander'
import pkg from '../package.json'
const chalk = require('chalk')
const fs = require('fs-extra')
const axios = require('axios')
const beautify = require('js-beautify').js_beautify
const { log } = console

const defualtHandlerParams = '{ctx,thisModel,ModelNode}'
const defualtRenderField = 'render'
program
    .version(pkg.version)
    .option("-v, --version", pkg.version)

program
    .command('init [env]')
    .description('init rosmaro try')
    .option("-u, --url <required>", "get graph from a url")
    .action(async (env, { url
    }) => {
        // try {
        //     const fetchedUrl = await axios('https://github.com/sagivStekolshik/rosmaro-cli')
        //     log(fetchedUrl);
        // }
        // catch (err) {

        // }
        log(chalk.greenBright.underline.dim('WIP'));
    });

/**
|--------------------------------------------------
| not sure if needed
| you need to make change in the graph.json and then use update with more ease
|--------------------------------------------------
*/
// program
//     .command('add <nodeName>')
//     .description('add node to ./handler/all.js file and generate a template with nodeName.js')
//     .action(nodeName => {
//         log(chalk.red("Generating ", nodeName))
//     })

program
    .command('update [entry]')
    .description('Update ./handler from graph.json')
    .option("-m, --handler-method <required>", `define the render method, ${defualtRenderField} by default`)
    .action(async (entry = "graph.json", { renderMethod = defualtRenderField }) => {
        log(chalk.blue.bold('Generating...'))
        // get the json representation of rosmaro
        let graph = {}

        try {
            graph = await fs.readJson(`${entry}`)

            if (!graph.main) {
                log("Graph must contain main as enrty")
                return
            }
        }
        catch (err) {
            // check if graph.json is present
            log(chalk.red.bold(entry), "was not found or dose not contain Json")
            return
        }
        try {
            await fs.ensureDir("./handlers")
            await fs.outputFile('./handlers/main.js',
                beautify(`export default ()=>{initCtx: {}}`, { indent_size: 2 })
            )

            const mainNodes = Object.keys(graph.main.nodes);

            // TODO make a more general thing and recursive if needed?
            await Object.keys(graph.main.nodes).map((item) => {
                fs.outputFile(`./handlers/${item}.js`,
                    beautify(`export default (${defualtHandlerParams})=>({${addArrowStringToHandler(graph.main.arrows[item])} ${renderMethod || defualtRenderField}: ()=> {}})`, { indent_size: 2, jslint_happy: true })
                )
                log(chalk`{green ${item} handler created }`)
            })

            await fs.outputFile('./handlers/all.js',
                beautify(`${mainNodes.map(node => `import ${node} from './${node}'`).join(" ")}  
                export default ({${mainNodes},main})`)
            )
        } catch (err) {
            log(chalk.red.bold(`an error occured`, err))
        }

    })
program.parse(process.argv);

// TODO make it a string prototype
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const addArrowStringToHandler = arrows => arrows ? Object.keys(arrows).map(item => `${toCamelCase(item)}: () => ({arrow: "${item}"}), `) : ""

// TODO make it a string prototype
const toCamelCase = notCamelized => notCamelized.split(" ").map((item, index) => index === 0 ? item.toLowerCase() : capitalize(item)).join('');