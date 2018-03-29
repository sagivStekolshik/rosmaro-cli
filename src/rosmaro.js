'use strict';

import program from 'commander'
import chalk from 'chalk'
import fs from 'fs-extra'
import ora from 'ora'
// import axios from 'axios'
import generateGraphFromUrl from './generateGraphFromUrl'

const beautify = require('js-beautify').js_beautify
const pkg = require('../package.json')
const { log } = console

const defualtHandlerParams = '{ctx,thisModel,ModelNode}'
const defualtRenderField = 'render'
// add -v functionality
program
    .version(pkg.version)
    .option("-v, --version", pkg.version)
    .option("-V, --Version", pkg.version)

// init
program
    .command('init <project-name>')
    .alias("initialize")
    .description('init rosmaro try')
    .option("-u, --url <url>", "get graph from a url")
    .option("-f,--framework <framework>", chalk`select a framework to base on. defaults to simple {blue console.log}`)
    .action(async (projectName, {
        url,
        framework = "webpack"
    } = {}) => {
        try {
            const graphSpinner = ora()
            // get a valid rosmaro graph if url is present
            const graph = url && await generateGraphFromUrl(url,graphSpinner)
            if (graph) graphSpinner.succeed(chalk.greenBright("Succescfully loaded graph.json from URL"))

            log("I'm initing")
        }
        catch (err) {
            if (err.spinner)
                err.spinner.fail(chalk.redBright(err.msg))
            else 
                ora().fail(chalk.redBright(err))
        }
    })

/*
|--------------------------------------------------
| not sure if needed
| you need to make change in the graph.json and then use update with more ease
|--------------------------------------------------

program
    .command('add <nodeName>')
    .description('add node to ./handler/all.js file and generate a template with nodeName.js')
    .action(nodeName => {
        log(chalk.red("Generating ", nodeName))
    })
*/
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