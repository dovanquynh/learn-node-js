require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})

const userRoute = require('./routes/user.router')
const authRoute = require('./routes/auth.router')

const apiProductRoute = require('./api/routes/product.route')

const authMiddleware = require('./middlewares/auth.middleware')

const port = 3000
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParse())

app.use(express.static('public'))


app.get('/', (req, res) => res.render('index'))

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth', authRoute)
app.use('/api/products', apiProductRoute)

app.listen(port, () => console.log(`Running port ${port}`))