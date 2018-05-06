let mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "rating": Number,
    "handedness": {
      type: String,
      enum: ['left', 'right']
    },
    "created_by": String
});

module.exports = mongoose.model('Player', playerSchema);
