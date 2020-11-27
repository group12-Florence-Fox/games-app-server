require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mainRouter = require('./routes/index')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//route
app.use('/', mainRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})