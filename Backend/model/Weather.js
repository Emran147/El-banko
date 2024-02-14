const mongoose = require('mongoose')
const Schema = mongoose.Schema


const citySchema = new Schema({
    name : String,
    temperature: Number,
    condition: String,
    conditionPic : String,
})


const CityWeather = mongoose.model("Weather", citySchema)

module.exports = CityWeather