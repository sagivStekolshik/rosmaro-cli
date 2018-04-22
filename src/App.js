import { h, Component, Text } from 'ink'
import argParser from 'yargs-parser'
import RosmaroInk from './RosmaroInk'
import graph from './graph.json'
import all from './handlers/all'

class App extends Component {

    render() {
        return (
            <RosmaroInk
                additive
                graph={graph}
                handlers={{
                    ...all,
                    main: {
                        initCtx: { ...all.main.initCtx, args: this.props.args }
                    }
                }} />
        )
    }
}

App.defaultProps = {
    args: argParser(process.argv.slice(2), {
        alias: {
            url: ['u'],
            version: ['v'],
            help: ['h']
        }
    })
}

export default App
