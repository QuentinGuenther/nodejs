const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.send('<h1>Hello Express</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Its 50 degrees',
        location: 'Seattle, Washington'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})