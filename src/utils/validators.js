exports.validateUser = function(body) {
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
