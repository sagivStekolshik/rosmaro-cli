import { h, Component, Text } from 'ink'
import argParser from 'yargs-parser'
import RosmaroBigText from './components/RosmaroBigText'
import RosmaroInk from './RosmaroInk'
import graph from './graph.json'
import all from './handlers/all'

class App extends Component {

    render() {
        return (
            <div>
                <RosmaroBigText name="rainbow" />
                <RosmaroInk
                    graph={graph}
                    handlers={{
                        ...all,
                        main: {
                            initCtx: this.props.args
                        }
                    }} />
            </div>
        )
    }
}

App.defaultProps = {
    args: argParser(process.argv.slice(2))
}

export default App
