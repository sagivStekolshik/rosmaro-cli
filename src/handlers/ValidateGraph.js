

export default {
    error: ({ ctx, err }) => ({ arrow: 'error', err }),
    done: () => ({arrow: 'exit'}),
    validGraph: () => ({arrow: 'valid graph'}),
    render: ({ ctx: { graph,url }, thisModel }) => {
        if (!graph.main) thisModel.error({
            err: {
                type: 'GraphError',
                content: 'Graph must contain main node as entry'
                
            }
        })

        // determine if writing to file is needed
        if(url) thisModel.validGraph()
        thisModel.done()
    }
}