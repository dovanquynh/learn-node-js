const express = require('express')
const multer = require('multer')

const db = require('../db')

var upload = multer({ dest: './public/uploads/' })

const controller = require('../controllers/user.controller')

const validate = require('../validate/user.validate')

const router = express.Router()

router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345)
    res.send('test')
})

router.get('/', controller.index)

router.get('/create', controller.create)

router.get('/:id', controller.detail)

router.post('/create', 
    upload.single('avatar'), 
    validate.postCreate, 
    controller.postCreate
)


module.exports = router