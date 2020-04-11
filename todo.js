const fs = require('fs')

function readTodos(path) {
    try {
        const stored_todo = fs.readFileSync('./data')
        return JSON.parse(stored_todo)
    }
    catch (err) {

    }
}

function writeTodo(todo_Array) {
    const todo_json = JSON.stringify(todo_Array)
    fs.writeFileSync('./data', todo_json)
}

var tasks = readTodos()

function add(options) {
    options.id = tasks.length + 1
    options.checked = false
    tasks.push(options)
    writeTodo(tasks)
}

function check(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].checked = true

        }
    }
    writeTodo(tasks)
}

function edit(options) {
    var id = options.id
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i] = options
            tasks[i].id = parseInt(id)
            tasks[i].checked = false
        }
    }
    writeTodo(tasks)
}

function remove(id) {
    const updatedTasks = tasks.filter((element) => {
        return element.id != id
    })
    writeTodo(updatedTasks)

}

function listAll() {
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]);
    }

}

function listChecked() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked == true)
            console.log(tasks[i]);
    }
}

function listUnchecked() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked == false)
            console.log(tasks[i]);
    }
}
module.exports = {
    add: add,
    check: check,
    edit: edit,
    remove: remove,
    listAll: listAll,
    listChecked: listChecked,
    listUnchecked: listUnchecked
}