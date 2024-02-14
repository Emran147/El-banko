

const arrangeWeather = function(city){
    const  arrangedWeatherObj = {
        name : city.name , 
        temperature : Math.round((city.main.temp - 32) / 1.8),
        condition : city.weather[0].description ,
        conditionPic : city.weather[0].icon
        
    }
    return arrangedWeatherObj
}

module.exports = {
    arrangeWeather : arrangeWeather,
}