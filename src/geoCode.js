const request = require('request')
 
const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiY2hha3NodXRhZ29kZSIsImEiOiJja2Zmb2EzaGYwZ20zMnVxdnM0NHIxM3B1In0.ImRfML-Xks8sgbfe0fsAoA'
    request({url: url, json: true}, (error,response) => {
        if(error){

            callback('Unable to conect',undefined)

        }else if(response.body.features.length===0){

            callback('Unable to find location',undefined)

        }else{

            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longititude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
                //console.log(latitude, longititude)

            })
        }
    })
}

module.exports = geoCode