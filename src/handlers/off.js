import {h,Text} from 'ink'
export default {
  click: () => ({arrow: 'click'}),

  render: (response) => {
    setTimeout(() => response.thisModel.click(),2000)
    return <Text>Off</Text>
  }
}