const express = require('express')
const {accountRouter, noteRouter} = require('./router')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.use('/user', accountRouter)
app.use('/note', noteRouter)
app.listen(3000, () => {
    console.log('Server is running on port: 3000!')
    })