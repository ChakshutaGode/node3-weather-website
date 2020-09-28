
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./geoCode')


const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Vahan',
        name: 'Chakshuta'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About',
        name:'By Chakshu'
    })
})

// app.get('', (req, res) => { 
//    // res.send('Hello express')
//    res.send('<h1>Weather</h1>')
// }) 

app.get('/help', (req, res) => {
    //res.send('Help Page')
    res.render('help',{
        title: 'Help Page',
        name: 'Chakshuta',
        age: 20
    })
})


app.get('/help/*',(req, res) => {
    res.send('help further not found')
})


app.get('/products',(req, res) => {
    if(!req.query.search){
        res.send({
            error:'Must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]  
    })
})


app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide us location'
        
        })
            }

            geoCode(req.query.address,(error,{latitude,longitude,location} ={}) => {
                if(error){
                    return res.send({error})
                }
                // forecast(latitude,longitude,(error,forecastData) => {
                //     if(error){
                //         return res.send({error})
                //     }
                    res.send({
                        //forecast:forecastData,
                        location,
                        address:req.query.address

                    })
                })
            })
    // res.send({
    //     forecast:'Its rainy today',
    //     location: 'India',
    //     address:req.query.address
    //     //longitude: -72.00,
        //latitude: 42.00
    



app.get('*',(req, res) => {
    res.render('404',{
        title:'404',
        errorMessage:'Page not Found',
        name:'Chakshuta'

    })
})

app.listen(port, ()=> {
    console.log('server is on  ' +port)
})


