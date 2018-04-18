export default {
    go: arrow => ({ arrow }),
    render: ({ ctx, thisModel }) => {
        if (ctx._[0] === "update")
            thisModel.go('update')
        // if trying to init rosmaro-cli will exit for now
        // its a WIP
        if (ctx._[0] === 'init')
            thisModel.go('exit')
        if(ctx.version || ctx.v)
            thisModel.go('version')
        if(ctx.help || ctx.h)
            thisModel.go('help')
        thisModel.go('exit')
    }
}