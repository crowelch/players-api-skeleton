const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const secrets = require('../../secrets');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}).exec().then(user => {
    // Check user is registered
    if (!user) {
      throw 'invalid email';
    }

    return user;
  }).then(user => {
    // Check if password is valid
    return bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
      if (isPasswordValid) {
        return user;
      }
      throw 'invalid password';

    });
  }).then(user => {
    // Return user
    let body = {
      success: true,
      token: jwt.sign({username: user.email}, secrets.jwtSecret),
      user: user
    };

    res.status(200).send(body);
  }).catch(error => {
    res.status(401).send(error);
  });
});

module.exports = router;
