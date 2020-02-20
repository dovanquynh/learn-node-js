const db = require('../db')
const shortid = require('shortid')

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.create = (req, res) => {
    console.log('cookies', req.cookies)
    res.render('users/create')
}

module.exports.detail = (req, res) => {
    const id = req.params.id
  
    const user =  db.get('users').find({ id: id }).value()
  
    res.render('users/detail', {
      user: user
    })
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate()
    req.body.avatar = req.file.path.split('/').slice(1).join('/')

    db.get('users').push(req.body).write()
    res.redirect('/users')
}