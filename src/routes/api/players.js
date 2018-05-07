const express = require('express');
const router = express.Router();
const validators = require('../../utils/validators');
const passport = require('../../utils/passport');
const { Player } = require('../../models');

router.post('/', function(req, res, next) {
  // Check token is valid
  passport.authenticate('jwt', {session: false}, function(err, user) {
    if (!user) {
      return res.status(403).send('not authenticated');
    }
    let userId = user._id;
    // Run validations
    validators.validatePlayer(req.body).then(() => {
      // Create player
      let player = req.body;
      player.created_by = userId;
      return Player.create(req.body);
    }).then(player => {
      // Return created player
      let body = {
        success: true,
        player: player
      };

      res.status(201).send(body);
    }).catch(error => {
      res.status(409).send(error);
    });

  })(req, res, next);
});

router.get('/', function(req, res, next) {
  // Check token is valid
  passport.authenticate('jwt', {session: false}, function(err, user) {
    if (!user) {
      return res.status(403).send('not authenticated');
    }
    // Return list of players
    let userId = user._id;
    Player.find({created_by: userId}).then(players => {
      let body = {
        success: true,
        players: players
      };

      res.status(200).send(body);
    });

  })(req, res, next);
});

router.delete('/:playerId', function(req, res, next) {
  // Check token is valid
  passport.authenticate('jwt', {session: false}, function(err, user) {
    if (!user) {
      return res.status(403).send('not authenticated');
    }
    let userId = user._id;
    let playerId = req.params.playerId;
    Player.findOne({_id: playerId}, (err, player) => {
      // check player exists, and user has permission to delete(user created player)
      if (err || !player || userId.toString() !== player.created_by) {
        return res.status(404).send();
      }
      // Delete player
      player.remove();
      return res.status(200).send();

    });

  })(req, res, next);
});

module.exports = router;
