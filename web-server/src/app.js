const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Quentin Guenther'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Quentin Guenther'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'FAQ (...and other Questions)',
        title: 'Help',
        name: 'Quentin Guenther'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, { summary, temperature, high, low, precipProbability }) => {
            if(error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                location: location,
                forecast: summary + ' It is currently ' + temperature + ' degrees out. ' +
                        'The high will be ' + high + ' and the low ' + low +
                        ' There is a ' + precipProbability + '% chance of rain',
                address: req.query.address
            })
        
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found!',
        name: 'Quentin Guenther'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        name: 'Quentin Guenther'
    })
})

app.listen(port, () => {
    console.log('Server is up on port:' + port)
})