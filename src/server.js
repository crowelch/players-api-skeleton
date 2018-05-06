const express = require('express')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/alchemy');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
