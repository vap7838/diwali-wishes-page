var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    user_name:  String,
    mobile_number: String,
  });

module.exports = mongoose.model('users',user);