const fs = require('fs')

const dataBuffer = fs.readFileSync('1-json.json')
const data = dataBuffer.toString()
const user = JSON.parse(data)
user.name = 'Quentin'
user.age = '23'

fs.writeFileSync('1-json.json', JSON.stringify(user))