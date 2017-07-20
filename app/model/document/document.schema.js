
var mongoose = require('mongoose');

var documentSchema = mongoose.Schema({
    _id: {type: Number, required: true, unique: true},
    url: {type: String, required: true, unique: true},
    evaluation: [{evaluator: String, rating: Number}]
}, { collection: 'user'});

module.exports = documentSchema;
