
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, select: false},
    firstName: {type: String, required: true}
}, { collection: 'user'});

module.exports = userSchema;