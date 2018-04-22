import { h, Text, Component } from 'ink'

class Error extends Component {
    componentDidMount = () => {
        setTimeout(() => {
            process.exit()
        },500)
    }
    
    render({ctx: {err}}) {
        return (
            <div>
                <div>
                    <Text red>An Error has occurred: </Text>
                </div>
                <div>
                    <Text red>{JSON.stringify(err, null, 2)}</Text>
                </div>
            </div>)
    }
}

export default {

    render: (props) => <Error {...props} />
}