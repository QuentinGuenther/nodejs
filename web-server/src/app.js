const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
    res.send({
        forecast: 'Its 50 degrees',
        location: 'Seattle, Washington'
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

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})