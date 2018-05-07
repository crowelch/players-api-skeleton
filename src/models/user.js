let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  'first_name': String,
  'last_name': String,
  'email': String,
  'password': String
});

userSchema.virtual('id').get(function() {
  return this._id;
});

userSchema.set('toJSON', {virtuals: true, getters: true});

module.exports = mongoose.model('User', userSchema);
