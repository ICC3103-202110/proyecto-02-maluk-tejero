const {printTable} = require("console-table-printer")
const {getTitle} = require("./view")
const {inputForm} = require("./view")

async function app(state, update, view){
    while (true){
        const {model, currentView} = state
        const {title, table} = currentView
        console.clear()
        console.log(title)
        if (model["cities"].length === 0){
            console.log("NO CITIES")
        } else {
            printTable(table)
        }
        const input = await inputForm(model)
        const refresh = await update(input, model)
        if (refresh === "ERROR") {
            continue
        }
        const updatedModel = await refresh
        state = {
            ...state,
            model: updatedModel,
            currentView: view(updatedModel)
        }
    }
}

module.exports = {
    app
}
