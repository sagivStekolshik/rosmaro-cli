import { h } from 'ink'
import fs from 'fs-extra'

export default {
    error: ({ ctx, err }) => ({ arrow: 'error', ctx: { ...ctx, err } }),
    done: () => ({ arrow: 'done' }),
    render: ({ ctx: { graph },thisModel }) => {
        fs.writeJSON('graph.json',graph)
            .then(() => thisModel.done())
            .catch(err => thisModel.error({err}))
    }
}