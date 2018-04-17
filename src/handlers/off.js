import {h,Text} from 'ink'
export default {
  render: (response) => {
    console.log(JSON.stringify(response,null,2));
    
    return <Text>Off</Text>
  }
}