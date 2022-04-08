const request= require('request')

const forecast= (latitude, longitude, callback)=>{
    const ur = 'http://api.weatherstack.com/current?access_key=24b5349e269168f2064e811c89907a84&query='+latitude+','+longitude+'&units=f'
    request({url: ur, json: true}, (error, response)=>{
        if(error){
            callback('unable to connect ', undefined)
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }else{
            const data = response.body.current.temperature
            const x = response.body.current.feelslike
            const c = response.body.current.weather_descriptions
            callback(undefined, 'It is currently '+data+
            ' degrees out. It feels like '+x+
            ' degrees out. It is '+c+' today')
        }
    })
}

module.exports= forecast