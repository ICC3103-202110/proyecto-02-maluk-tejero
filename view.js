const figlet = require("figlet")
const chalk = require("chalk")
const inquirer = require("inquirer")

function getTitle(){
    return chalk.green(
        figlet.textSync(
            "Weather App",
            {
                horizontalLayout: "full",
                font: "Nancyj-Underlined"
            }
        )
    )
}

function getTable(model){
    const {cities} = model
    const {temp} = model
    const {max} = model
    const {min} = model
    const rows = []
    var i
    for (i in cities) {
        const name = cities[i]
        rows.push({"name": name, "temp": temp[name], "max": max[name], "min": min[name]})
    }
    return rows
}


function askAction() {
    return inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Select action:",
            choices: ["Add City", "Update City", "Delete City"]
        }
    ])
}

function askLocation() {
    return inquirer.prompt([
        {
            name: "city",
            type: "input",
            message: "Location",
        }
    ])
}

function askUpdate(model) {
    const {cities} = model
    return inquirer.prompt([
        {
            name: "city",
            type: "list",
            message: "Update City:",
            choices: cities
        }
    ])
}

function askDelete(model) {
    const {cities} = model
    return inquirer.prompt([
        {
            name: "city",
            type: "list",
            message: "Delete city:",
            choices: cities
        }
    ])
}

function view(model){
    return {
        title: getTitle(),
        table: getTable(model)
    }
}

module.exports = {
    getTitle,
    view,
    askAction,
    askLocation,
    askUpdate,
    askDelete
}
