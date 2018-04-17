import { h, Component } from "ink";
import rosmaro from 'rosmaro';
import makeStorage from 'rosmaro-in-memory-storage';
import makeLock from 'rosmaro-process-wide-lock';

class RosmaroInk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: null
        }
        this.refreshView = () => Promise.resolve(this.model.render())
            .then(view => this.setState({ view }));

        this.model = rosmaro(Object.assign({}, this.props, {
            afterTransition: () => {
                this.props.afterTransition();
                this.refreshView();
            }
        }));
    }

    componentDidMount() {
        this.refreshView();
    }

    render() {
        return this.state.view;
    }
}

RosmaroInk.defaultProps = {
    storage: makeStorage(),
    lock: makeLock(),
    afterTransition: () => { }
}


export default RosmaroInk