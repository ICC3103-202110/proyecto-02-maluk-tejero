const axios = require("axios")


function api (city) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'f85f5c8de2893ee54981ed7d7d327120'
    const FULL_API_URL  = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    return new Promise(function (resolve, reject) {
        axios.get(FULL_API_URL).then((response) => {
                var result = response.data.main
                const data = resolve([result.temp_min, result.temp_max, result.temp])
            },
                (error) => {
                    reject(error)
                }
        )
    }) 
}
  

async function update(input, model){
    const {action} = input
    const {city} = input
    var {cities}  = model
    var {temp} = model
    var {max} = model
    var {min} = model
    var res = await api(city)
    const low = res[0]
    const high = res[1]
    const actual = res[2]
    if (action === "Add City") {
        cities.push(city)
        temp[city] = actual
        max[city] = high
        min[city] = low
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
