const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const secrets = require('../../secrets');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
  let user = {};

  User.findOne({email: req.body.email}).exec().then(user => {
    if(!user) {
      throw 'invalid email';
    }

    return user;
  }).then(user => {
    return bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
      if(isPasswordValid) {
        return user;
      } else {
        throw 'invalid password';
      }
    });
  }).then(user => {
    let body = {
      success: true,
      token: jwt.sign({username: user.email}, secrets.jwtSecret),
      user: {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    }

    res.status(200).send(body);
  }).catch(error => {
    res.status(401).send(error);
  });
});

module.exports = router;
