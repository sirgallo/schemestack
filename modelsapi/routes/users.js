const express = require('express');
const router = express.Router();
const Maria = require('../public/javascripts/mariadb')
const user = require('../models/userinst')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const maria = new Maria.MariaDB()
  let findUser = "select * from `users` where `users`.email = '" +
    req.body.email + "' limit 1"
  maria.query(findUser)
    .then(user => {
      console.log(user)
    })
    .catch(err => {
      console.log(err)
      res.send({'status': 'failure', 'message': 'User could not be retrieved'})
    })
})

router.post('/register', function(req, res, next){
  //  initialize new user instance
  let User = user.User
  User.firstname = req.body.firstname
  User.lastname = req.body.lastname
  User.email = req.body.email
  User.password = bcrypt.hashSync(req.body.password, 8)

  let insertUser = "insert into table `users` (`first_name`, `last_name`, `email`, `password`) values ('" +
    User.firstname + "', '" +
    User.lastname + "', '" +
    User.email + "', '" +
    User.password + "');"
  const maria = new Maria.MariaDB()
  maria.insert(insertUser, User.email)
    .then(() => {
      console.log('inserted new user successfully')
      maria.query()
        .then(user => {
          console.log('User grabbed...:', user)
          maria.close()
            .then(() => {
              res.send({'status': 'success', 'message': 'User successfully inserted', 'auth': true, 'token': token, 'user': user})
            })
        })
    })
    .catch(err => {
      console.log(err)
      res.send({'status': 'failure', 'message': 'User was not created'})
    })
})

module.exports = router