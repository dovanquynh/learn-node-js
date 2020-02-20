const express = require('express')
const bodyParser = require('body-parser')
const cookieParse = require('cookie-parser')

const userRoute = require('./routes/user.router')
const authRoute = require('./routes/auth.router')

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

app.listen(port, () => console.log(`Running port ${port}`))