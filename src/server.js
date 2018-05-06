const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const secrets = ('./secrets');

mongoose.connect('mongodb://localhost/alchemy');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Routes
const apiBaseRoute = require('./routes/api/index')
const playersRoute = require('./routes/api/players');
const usersRoute = require('./routes/api/users');

const app = express();

app.use(bodyParser.json());
// app.use(expressJwt({secret: secrets.jwtSecret}).unless({path: ['']}))

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', apiBaseRoute);
app.use('/api/user', usersRoute);
app.use('/api/player', playersRoute);

app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
