
export default {
    goToExit: () => ({ arrow: 'exit' }),
    goToInit: () => ({ arrow: 'exit' }),
    goToUpdate: () => ({ arrow: 'update' }),
    goToVersion: () => ({ arrow: 'version' }),
    goToHelp: () => ({ arrow: 'help' }),

    render: ({ ctx, thisModel }) => {
        if (ctx.args._[0] === "update")
            thisModel.goToUpdate()
        // if trying to init rosmaro-cli will exit for now
        // its a WIP
        if (ctx.args._[0] === 'init')
            thisModel.goToInit()
        if (ctx.args.version || ctx.args.v)
            thisModel.goToVersion()
        if (ctx.args.help || ctx.args.h)
            thisModel.goToHelp()
        // default is init
        if (ctx.args._[0] === '')
            thisModel.goToInit()
        thisModel.goToExit()
    }
}