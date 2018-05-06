const { User, Player } = require('../../src/models');

exports.validateUser = body => {
  return new Promise((resolve, reject) => {
    // 'first_name', 'last_name', 'email' must all be present
    if(body.first_name === undefined || body.first_name === '') {
        reject('first name cannot be blank');
    }
    if(body.last_name === undefined || body.last_name === '') {
        reject('last name cannot be blank');
    }
    if(body.email === undefined || body.email === '') {
        reject('email cannot be blank');
    }

    // passwords must match
    if(body.password !== body.confirm_password) {
        reject('passwords must match');
    }

    resolve();
  });
}

exports.validatePlayer = body => {
  return new Promise((resolve, reject) => {
    // 'first_name', 'last_name', 'email' must all be present
    if(body.first_name === undefined || body.first_name === '') {
        reject('first name cannot be blank');
    }
    if(body.last_name === undefined || body.last_name === '') {
        reject('last name cannot be blank');
    }
    if(body.rating === undefined || body.rating === '') {
        reject('email cannot be blank');
    }
    if(body.handedness === undefined || body.handedness === '') {
        reject('email cannot be blank');
    }

    resolve();
  }).then(() => {
    return Player.findOne({first_name: body.first_name, last_name: body.last_name});
  }).then(player => {
    if(player) {
      throw 'player already exists by that name';
    }
  });
}
