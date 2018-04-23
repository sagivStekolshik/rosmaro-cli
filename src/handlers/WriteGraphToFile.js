import { h } from 'ink'
import fs from 'fs-extra'

export default {
    error: ({ ctx, err }) => ({ arrow: 'error', ctx: { ...ctx, err } }),
    done: () => ({ arrow: 'exit' }),
    render: ({ ctx: { graph }, thisModel }) => (<Text>{typeof graph}</Text>)
}