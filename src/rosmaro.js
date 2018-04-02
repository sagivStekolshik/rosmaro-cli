'use strict';

import program from 'commander'
import chalk from 'chalk'
import fs from 'fs-extra'
import ora from 'ora'
// import axios from 'axios'
import generateGraphFromUrl from './generateGraphFromUrl'
import oraPromise from './oraPromise'

const beautify = require('js-beautify').js_beautify
const pkg = require('../package.json')
const { log } = console

const defualtHandlerParams = '{ctx,thisModel,ModelNode}'
const defualtRenderField = 'render'
const beautifyConfig = { indent_size: 2, jslint_happy: true }
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
            const graph = url && await generateGraphFromUrl(url, graphSpinner)
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
        // get the json representation of rosmaro
        const updateGraphSpinner = ora({
            text: chalk.blue.bold('Generating...'),
            color: "blue"
        })
        let graph = await oraPromise(fs.readJson(`${entry}`), { spinner: updateGraphSpinner, succesText: "succesfully read graph" })
        if(graph.errno) return
        // validate graph
        // TODO add more tests to verify integrity and make it a seperate function
        if (!graph.main) {
            updateGraphSpinner.fail("Graph must contain main as enrty")
            return
        }
        const handlersSpinner = ora().start("generating handlers folder")

        await fs.ensureDir("./handlers")
        handlersSpinner.text = 'genertaing main handler template'
        await fs.outputFile('./handlers/main.js',
                beautify(`export default ()=>{initCtx: {}}`, beautifyConfig)
            )

            const mainNodes = Object.keys(graph.main.nodes);
        setTimeout(() => handlersSpinner.stop(),2000)
        /*
        try {

            const mainNodes = Object.keys(graph.main.nodes);

            // TODO make a more general thing and recursive if needed?
            await mainNodes.map(async (item) => {
                handlersSpinner.text = `generating ${item} handler template`
                await fs.outputFile(`./handlers/${item}.js`,
                    beautify(`export default (${defualtHandlerParams})=>({${addArrowStringToHandler(graph.main.arrows[item])} ${renderMethod || defualtRenderField}: ()=> {}})`, beautifyConfig)
                )
                // log(chalk`{green ${item} handler created }`)
            })
            handlersSpinner.text = "generating all handler file"
            await fs.outputFile('./handlers/all.js',
                beautify(`${mainNodes.map(node => `import ${node} from './${node}'`).join(" ")}  
                export default ({${mainNodes},main})`)
            )
            handlersSpinner.succeed(chalk.green("finished generating templates"))
        } catch (err) {
            handlersSpinner.fail(chalk.red.bold(err))
        }
        */

    })

program.parse(process.argv);

// TODO make it a string prototype
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const addArrowStringToHandler = arrows => arrows ? Object.keys(arrows).map(item => `${toCamelCase(item)}: () => ({arrow: "${item}"}), `) : ""

// TODO make it a string prototype
const toCamelCase = notCamelized => notCamelized.split(" ").map((item, index) => index === 0 ? item.toLowerCase() : capitalize(item)).join('');