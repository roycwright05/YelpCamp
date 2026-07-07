const express = require('express')
const port = 6190
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {

    res.send(`<h1>Yes, you are listening on port ${port}</h1>`)
})

app.get('/home', (req, res) => {

    res.render('home')
})

app.listen(port, () => 
    {
        console.log(`Servicing on port ${port}`)
    })