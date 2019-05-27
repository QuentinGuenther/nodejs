const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if(!address) {
  console.log('Please provide an address')
} else {
  geocode(address, (error, locationData) => {
    if(error) {
      return console.log(error)
    }
    
    forecast(locationData.latitude, locationData.longitude, (error, forecastData) => {
      if(error) {
        return console.log(error)
      }
      
      console.log(locationData.location)
      console.log(forecastData.summary + ' It is currently ' + forecastData.temperature + ' degrees out. There is a ' + forecastData.precipProbability + '% chance of rain')
    })
  })
}
