const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/83ddf86f6eaaf7a58b933078edaee726/'+ latitude +',' + longitude

  request({url, json: true}, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if(body.error) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      })
    }
  })
}

module.exports = forecast