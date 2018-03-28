import axios from 'axios'
import chalk from 'chalk'
export default async url => new Promise(async (res, rej) => {
    try {
        // run checks on URL to validate its url
        if (!url) return rej(chalk`{red {bold URL} must be a real URL}`)
        
        const graph = await axios(url)
        const { data } = graph
        // check graph integrity
        if (!data.main) return rej("Graph must contain main node")
        // need more test for the graph
        return res(data);
    }
    catch (err) {
        console.log(err);
        return rej(err)
    }
})