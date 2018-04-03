import chalk from 'chalk'
import fs from 'fs-extra'
import Ora from 'ora'
const beautify = require('js-beautify').js_beautify

const beautifyConfig = { indent_size: 2, jslint_happy: true }

const handlerGenerator = async ({
    graph,
    node = "main",
    path = "./" }) => {
    switch (graph[node].type) {

        case 'leaf': {
            // add arrow handler and stuff
            return await fs.outputFile(`./handlers/${node}.js`,
                beautify(`export default ({ctx,thisModel,ModelNode})=>({ render: ()=> {}})`, beautifyConfig)
            )
        }
        case 'graph': {
            // ensure no duplicate underlayer with Set and spread operator
            const nodes = [... new Set(Object.values(graph[node].nodes))]
            // TODO: create file from graphTemplate
            return nodes.map(async node => {
                await fs.outputFile(`./handlers/${node}.js`,
                    beautify(`export default ()=>{}`, beautifyConfig)
                )
                return await handlerGenerator({ graph, node, path })
            })

        }
        case 'composite': { // ensure no duplicate underlayer with Set and spread operator
            const nodes = [... new Set(Object.values(graph[node].nodes))]
            // TODO: create file from compositeTemplate
            return nodes.map(async node => {
                await fs.outputFile(`./handlers/${node}.js`,
                    beautify(`export default ({res})=>{}`, beautifyConfig)
                )
                return await handlerGenerator({ graph, node, path })
            })
        }
        case 'dynamicComposite': console.log('dynamicComposite'); return;
        default: throw new TypeError(`${graph[currentNode].type} is not part of rosmaro`)
    }

}


export default handlerGenerator