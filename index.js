const express = require('express')
const { default: mongoose } = require('mongoose')

const activityRouter = require('./src/router/activities')

const port = 8080
const app = express()

app.use(express.json())

app.use('/activities', activityRouter)

const start = async() =>{
    await mongoose.connect('YOUR DATABASE URL')
    app.listen(port, () => {
        console.log('Server is listening on port', port)
    })

}

start()