

var mongoose = require('mongoose'),
    documentSchema = require('./document.schema'),
    documentModel = mongoose.model('DocumentModel', documentSchema);

documentModel.findAllDocuments = findAllDocuments;
documentModel.updateEvaluation = updateEvaluation;
documentModel.createDocuments = createDocuments;

/**
 * Exports
 */
module.exports = documentModel;

function findAllDocuments() {
    return documentModel.find().sort({_id: 1});
}

function updateEvaluation(documentId, evaluator, rating) {
    return documentModel.update({_id: documentId},
        {'$set': {'evaluation.$.evaluator': evaluator,
        'evaluation.$.rating': rating}});
}

function createDocuments(documents) {
    return documentModel.create(documents);
}
