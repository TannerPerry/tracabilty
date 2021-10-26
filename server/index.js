const express = require('express')

const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'f27951a1e33a405d8dc15b3eab2a2e9a',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    rollbar.info('html file served successfully')
})
app.use(rollbar.errorHandler())

const port = process.env.PORT || 4567

app.listen(port, () => console.log(`Take us to warp ${port}!`))