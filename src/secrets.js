// jwtSecret should be an actual secret in a .gitignored file
// saltRounds isn't secret info, but more of a config. added here for convencience isntead of creating a seperate config file
const secrets = {
  jwtSecret: 'transmutation',
  saltRounds: 10
};

module.exports = secrets;
