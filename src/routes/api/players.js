const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secrets = require('../../secrets');
const validators = require('../../utils/validators');
const passport = require('../../utils/passport');
const { Player } = require('../../models');

router.post('/', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, function(err, user, info) {
    if(!user) {
      return res.status(403).send('not authenticated');
    }
  })(req, res, next);

  validators.validatePlayer(req.body).then(() => {
    //create player
    return Player.create(req.body);
  }).then(player => {
    let body = {
      success: true,
      player: player
    }

    res.status(201).send(body);
  }).catch(error => {
    res.status(409).send(error);
  });
});

router.get('/', function(req, res) {
    res.send('oh hi Mark');
});


router.delete('/:playerId', function(req, res) {

});

module.exports = router;
