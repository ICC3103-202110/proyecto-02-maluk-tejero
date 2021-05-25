

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min+1) + min
    )
}


function update(input, model){
    const {action} = input
    const {city} = input
    var {cities}  = model
    var {temp} = model
    var {max} = model
    var {min} = model
    const low = between(-500, 1000)/100
    const high = between(2500, 3500)/100
    const actual = between(low, high)/100
    if (action === "Add City") {
        cities.push(city)
        temp[city] = actual
        max[city] = high
        min[city] = low
        console.log(cities)
        return {
            ...model,
            cities: cities,
            temp: temp,
            max: max,
            min: min
        }
    } else if (action === "Update City") {
        temp[city] = actual
        max[city] = high
        min[city] = low
        return {
            ...model,
            temp: temp,
            max: max,
            min: min
        }
    } else if (action === "Delete City") {
        var filter = cities.filter(function(value){
            return value !== city
        })
        delete temp[city]
        delete max[city]
        delete min[city]
        return {
            ...model,
            cities: filter,
            temp: temp,
            max: max,
            min: min
        }
    }
}

module.exports = {
    update
}
