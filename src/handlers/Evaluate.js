
export default {
    goToExit: () => ({ arrow: 'exit' }),
    goToInit: () => ({ arrow: 'exit' }),
    goToUpdate: () => ({ arrow: 'update' }),
    goToVersion: () => ({ arrow: 'version' }),
    goToHelp: () => ({ arrow: 'help' }),

    render: ({ ctx: { args }, thisModel }) => {
        if (args._[0] === "update")
            thisModel.goToUpdate()
        // if trying to init rosmaro-cli will exit for now
        // its a WIP
        if (args._[0] === 'init')
            thisModel.goToInit()
        if (args.version)
            thisModel.goToVersion()
        if (args.help)
            thisModel.goToHelp()
        // default is init
        if (args._[0] === '')
            thisModel.goToInit()
        thisModel.goToExit()
    }
}