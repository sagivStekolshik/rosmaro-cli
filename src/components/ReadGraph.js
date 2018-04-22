import { h, Text, Component } from 'ink'
import fs from 'fs-extra'
import Spinner from 'ink-spinner'
import fetch from 'node-fetch'

class ReadGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: 'Reading graph ',
            readType: props.ctx.args.url ? 'Url' : 'File'
        }
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.getGraph(this.state.readType)
                .then(graph => this.setState({ msg: 'successfully read graph' }, () => {
                    this.props.thisModel[`graphFrom${this.state.readType}`]({ graph })
                }))
                .catch(err => this.props.thisModel.error({ err }))
        }, 500)
    }

    getGraph = (method = 'file') => {
        switch (method.toLowerCase()) {
            case 'file':
                return fs.readJson('graph.json')
            case 'url':
                return fetch(this.props.ctx.args.url).then(res => res.json())
        }
    }



    render(props, { msg }) {
        return (
            <Text green>
                {msg} <Spinner type='line2' />
            </Text>
        )
    }
}

export default ReadGraph