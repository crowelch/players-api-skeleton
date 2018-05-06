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
    } else {
      let userId = user._id;
      validators.validatePlayer(req.body).then(() => {
        //create player
        let player = req.body;
        player.created_by = userId;

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
    }
  })(req, res, next);
});

router.get('/', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, function(err, user, info) {
    if(!user) {
      return res.status(403).send('not authenticated');
    } else {
      let userId = user._id;
      Player.find({created_by: userId}).then(players => {
        let body = {
          success: true,
          players: players
        }

        res.status(200).send(body);
      });
    }
  })(req, res, next);
});


router.delete('/:playerId', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, function(err, user, info) {
    if(!user) {
      return res.status(403).send('not authenticated');
    } else {
      let userId = user._id;
      let playerId = req.params.playerId;
      Player.findOne({_id: playerId}, (err, player) => {
        if(err || !player) {
          return res.status(404).send();
        } else if(userId != player.created_by) {
          return res.status(404).send();
        } else {
          player.remove();
          return res.status(200).send();
        }
      });
    }
  })(req, res, next);
});

module.exports = router;
