import { h, Component, Text } from 'ink'

class Start extends Component {

  componentDidMount() {
    // setTimeout(() => {
    //   console.log(JSON.stringify(this.props));
      
    //   this.props.thisModel.done
    // },1000)
  }

  render({ctx: {_: fb }, thisModel}) {
    return (
      <div>
        <div>
          <Text>This is Start Component</Text>
        </div>
      </div>
    )
  }
}

Start.defaultProps = {
  ctx: {},
  thisModel: {}
}

export default Start