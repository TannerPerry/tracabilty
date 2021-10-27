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
    try {
        nonExistentFunction();
      } catch (error) {
        rollbar.log(error)
      }
      
})
app.get('/style', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.css'))
})

app.get('/warning',(req,res) =>{
    rollbar.warning('user clicked warning button')
    console.log('give me a warning')
})
app.get('/critical',(req,res) =>{
    rollbar.critical('test')
    rollbar.critical('user clicked critical button')
    res.status(400).send('critical error')
    console.log('give me a critical error')
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4567

app.listen(port, () => console.log(`Take us to warp ${port}!`))