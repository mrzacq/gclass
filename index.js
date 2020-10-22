const express = require('express')
const app = express()
const port = 3456
const router = require('./router/index.js')
const session =require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false, sameSite:true}
}))
app.use(router)

app.listen(port, () => console.log(`running http://localhost:${port}`))