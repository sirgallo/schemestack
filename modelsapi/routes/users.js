const express = require('express');
const router = express.Router();
const Maria = require('../public/javascripts/mariadb')
const user = require('../models/userinst')

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const maria = new Maria.MariaDB()
  let findUser = "select * from `users` where `users`.email = '" +
    req.body.email + "' limit 1"

});

router.post('/register', function(req, res, next){
  //  initialize new user instance
  let User = user.User
  User.firstname = req.body.firstname
  User.lastname = req.body.lastname
  User.email = req.body.email
  User.password = req.body.password
})

module.exports = router