const axios = require("axios")


function api (city) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'f85f5c8de2893ee54981ed7d7d327120'
    const FULL_API_URL  = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    try {
        const request = axios.get(FULL_API_URL)
        .then((response) => {
                    var result = response.data.main
                    const data = [result.temp_min, result.temp_max, result.temp]
                    return data
                })
        .catch(function (error){
            if (error.response) {
                return error.response.data.cod
            }
        })
        return request
        } catch (error) {
            //pass
        }
}


async function update(input, model){
    const {action} = input
    const {city} = input
    var {cities} = model
    var {temp} = model
    var {max} = model
    var {min} = model
    if (action === "Add City") {
        var res = await api(city)
        if (String(res) == String(404) || String(res) == String(400)) {
            return "ERROR"
        }
        const low = res[0]
        const high = res[1]
        const actual = res[2]
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
        var res = await api(city)
        if (String(res) == String(404) || String(res) == String(400)) {
            return "ERROR"
        }
        const low = res[0]
        const high = res[1]
        const actual = res[2]
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
