const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const { errorMonitor } = require('events')

mongoose.connect('mongodb://localhost:27017/yelp-camp').then(() => {
    console.log(`MONGO CONNECTION OPEN`)
})
.catch( err => {
    console.log(`HOUSTON. WE HAVE A PROBLEM`)
    console.log(err)
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const port = 6190
const app = express()


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {

    res.render('home')
})

app.listen(port, () => 
    {
        console.log(`Servicing on port ${port}`)
    })