let mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "rating": Number,
    "handedness": {
      type: String,
      enum: ['left', 'right']
    },
    "created_by": String
});

playerSchema.virtual('id').get(function() {
  return this._id;
});

playerSchema.set('toJSON', {virtuals: true, getters: true});

module.exports = mongoose.model('Player', playerSchema);
