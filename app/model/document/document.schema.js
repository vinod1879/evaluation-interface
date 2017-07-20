
var mongoose = require('mongoose');

var documentSchema = mongoose.Schema({
    _id: {type: Number, required: true, unique: true, index: true},
    url: {type: String, required: true},
    queryId: {type: Number},
    topic: {type: String, required: true},
    evaluation: [{evaluator: String, rating: Number}]
}, { collection: 'document'});

module.exports = documentSchema;
