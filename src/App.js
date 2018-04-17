import { h, render, Component, Text } from 'ink'
import argParser from 'yargs-parser'
import RosmaroBigText from './RosmaroBigText'

class App extends Component {

    render() {
        return (
            <div>
                <RosmaroBigText name="rainbow" />
            </div>
        )
    }
}

App.defaultProps = {
    args: argParser(process.argv.slice(2))
}

export default App
