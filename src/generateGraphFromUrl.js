import axios from 'axios'
import chalk from 'chalk'
import ora from 'ora'
export default async (url, spinner) => new Promise(async (res, rej) => {
    try {
        // if (spinner) spinner.start("fetching graph.json from server")
        // run checks on URL to validate its url
        if (!url) return rej(chalk.red(`red URL must be valid`))

        const graph = await axios(url)
        const { data } = graph
        // check graph integrity
        if (!data.main) return rej(chalk.red(`Graph must contain main node`))

        // need more test for the graph
        return res(data);
    }
    catch (err) {
        return rej(chalk.red(err))
    }
})