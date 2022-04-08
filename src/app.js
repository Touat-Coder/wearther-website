const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app= express()
//Define paths for express
const file=path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directoy to serve
app.use(express.static(file))
app.get('',(req, res)=>{
    res.render('index',{
        title: 'weather',
        name: 'Tayeb Sid'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Tayeb Sid'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help !!!',
        name: 'Tayeb sid',
        msg:' How can i help you sir'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.adress){
        return res.send({
            error: 'you should pass an adress'
        })
    }
    geocode(req.query.adress, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({ error})
        }
        forecast(latitude,longitude, (error, fdata)=>{
            if(error){
                res.send({error})
            }

            res.send({
                forecast:fdata,
                location,
                adress: req.query.adress
            })
        })
    })
})
app.get('/products', (req, res)=>{
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        errorMsg: 'help article not found',
        name: 'Tayeb Sid',
        title: '4o4'
    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        errorMsg:'My 404 page',
        title: '404',
        name:'Tayeb Sid'
    })
})
app.listen(3000, ()=>{
    console.log('server is up on 3000')
})
