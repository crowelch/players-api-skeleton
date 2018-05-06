const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const secrets = require('../../secrets');
const validators = require('../../utils/validators');
const bcrypt = require('bcrypt');

// Create user
router.post('/', (req, res) => {
    // Ensure data is present and valid
    validators.validateUser(req.body).then(() => {
      return User.findOne({email: req.body.email}).exec();
    }).then(user => {
      // Check if user is registered (email is already present)
      if(user) {
        throw 'user already registered';
      }
    }).then(() => {
      // Encrypt password
      return bcrypt.hash(req.body.password, secrets.saltRounds);
    }).then(encryptedPassword => {
      let user = req.body;
      user.password = encryptedPassword

      return User.create(user);
    }).then(user => {
      // If user is created, return user object and jwt
      let body = {
        success: true,
        token: jwt.sign({id: user._id}, secrets.jwtSecret),
        user: user
      }

      res.status(201).send(body);
    }).catch(error => {
      res.status(409).send(error);
    });
});

// Update user
router.put('/:userId', (req, res) => {
  let userId = req.params.userId
  let body = req.body;

  // Ensure new data is valid.
  // This could be customized for update if it has different requirements
  validators.validateUser(body).then(() => {
    return User.findOne({_id: userId}).exec();
  }).then(user => {
    // Ensure we find a user with the id sent
    if(!user) {
      throw 'user not found'
    }
    return user;
  }).then(user => {
    // Encrypt new password
    return bcrypt.hash(req.body.password, secrets.saltRounds).then(encryptedPassword => {
      user.password = encryptedPassword;
      return user;
    });
  }).then(user => {
      // Time to update the other user data
      user.email = body.email;
      user.first_name = body.first_name;
      user.last_name = body.last_name;

      return user.save();
    }).then(user => {
      // If user is created, return user object and jwt
      let body = {
        success: true,
        token: jwt.sign({id: user._id}, secrets.jwtSecret),
        user: user      }

      res.status(200).send(body);
    }).catch(error => {
      res.status(409).send(error);
  });
});

module.exports = router;
