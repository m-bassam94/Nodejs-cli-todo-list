const todo = require('./todo.js')
const fs = require('fs')

function createIfNotExists(path) {
    if (!fs.existsSync(path)) {
        const data = [];
        const jsonData = JSON.stringify(data)
        fs.writeFileSync('./data', jsonData)
    }
}

function parseCmdArgs(cmdArgs) {
    const [, , , ...options] = cmdArgs
    const parsedOptions = options.reduce((cum, elem) => {
        const [optionTitle, optionValue] = elem.split('=')
        cum[optionTitle] = optionValue
        return cum;
    }, {})
    return parsedOptions;
}


function main(cmdArgs) {

    createIfNotExists('./data')

    const parsedArgs = parseCmdArgs(cmdArgs)

    const [, , command,] = cmdArgs
    const cli = command

    switch (cli) {

        case 'add':
            todo.add(parsedArgs)
            todo.listAll()
            break;
        case 'check':
            todo.check(parsedArgs.id)
            todo.listAll()
            break;
        case 'edit':
            todo.edit(parsedArgs)
            todo.listAll()
            break;
        case 'remove':
            todo.remove(parsedArgs.id)
            break;
        case 'listall':
            todo.listAll()
            break;
        case 'listchecked':
            todo.listChecked()
            break;
        case 'listunchecked':
            todo.listUnchecked()
            break;
    }
}

main(process.argv)