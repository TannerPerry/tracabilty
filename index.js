const express = require('express')

const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'f0496bcbb33448eaac79c4cabe54f274',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})
app.use(rollbar.errorHandler())

const port = process.env.PORT || 4567

app.listen(port, () => console.log(`Take us to warp ${port}!`))