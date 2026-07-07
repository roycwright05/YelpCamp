const express = require('express')
const port = 6190
const app = express()

app.get('/', (req, res) => {

    res.send(`<h1>Yes, you are listening on port ${port}</h1>`)
})

app.listen(port, () => 
    {
        console.log(`Servicing on port ${port}`)
    })