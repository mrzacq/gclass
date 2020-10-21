const express = require('express')
const app = express()
const port = 3456
const router = require('./router/index.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(port, () => console.log(`running http://localhost:${port}`))