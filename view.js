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


function inputForm(model){
    const {cities} = model
    return inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Select action:",
            choices: ["Add City", "Update City", "Delete City"]
        },
        {
            name: "city",
            type: "input",
            message: "Location",
            when: (answers) => answers.action === "Add City"
        },
        {
            name: "city",
            type: "list",
            message: "Update City:",
            choices: cities,
            when: (answers) => answers.action === "Update City"
        },
        {
            name: "city",
            type: "list",
            message: "Delete city:",
            choices: cities,
            when: (answers) => answers.action === "Delete City"
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
    inputForm,
    view
}
