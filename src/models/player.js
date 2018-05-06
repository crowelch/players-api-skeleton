let mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "rating": Number,
    "handedness": String
});

module.exports = mongoose.model('Player', playerSchema);
