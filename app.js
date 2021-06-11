const {printTable} = require("console-table-printer")
const {getTitle} = require("./view")
const {askAction} = require("./view")
const {askLocation} = require("./view")
const {askUpdate} = require("./view")
const {askDelete} = require("./view")

async function app(state, update, view){
    while (true) {
        const {model, currentView} = state
        const {title, table} = currentView
        console.clear()
        console.log(title)
        if (model["cities"].length === 0){
            console.log("NO CITIES")
        } else {
            printTable(table)
        }
        if (error) {
            console.log("City not found")
        }
        var error = false
        const inputAct = await askAction()
        var inputLoc = ""
        if (inputAct.action === "Add City") {
            inputLoc = await askLocation()
        } else if (inputAct.action === "Update City" && model["cities"].length != 0) {
            inputLoc = await askUpdate(model)
        } else if (inputAct.action === "Delete City" && model["cities"].length != 0) {
            inputLoc = await askDelete(model)
        } else {
            error = true
            continue
        }
        const refresh = await update(inputAct, inputLoc, model)
        if (refresh === "ERROR") {
            error = true
            continue
        }
        const updatedModel = refresh
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
