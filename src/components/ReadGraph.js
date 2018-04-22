import { h, Text, Component } from 'ink'
import fs from 'fs-extra'
import Spinner from 'ink-spinner'

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
        fs.readJSON('graph.json')
            .then(graph => this.setState({msg: 'successfully read graph'},() => {
                this.props.thisModel[`graphFrom${this.state.readType}`]({graph})
            }))
            .catch(err => this.props.thisModel.error({err}))
        },500)
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