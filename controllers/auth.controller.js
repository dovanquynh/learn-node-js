const db = require('../db')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
    const email = req.body.email
    const pass = req.body.password

    const user = db.get('users').find({ email: email }).value()

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist'
            ],
            values: req.body
        })
        return
    }

    if(user.password !== pass) {
        res.render('auth/login', {
            errors: [
                'Wrong password'
            ],
            values: req.body
        })
        return
    }
    
    res.cookie('userId', user.id)
    res.redirect('/users')
}