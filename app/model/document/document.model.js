

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

    return documentModel.findOne({_id: documentId})
        .then(
            function (document) {
                var updated = false;
                for (var i in document.evaluation) {
                    if (document.evaluation[i].evaluator == evaluator) {
                        document.evaluation[i].rating = rating;
                        updated = true;
                        break;
                    }
                }

                if (!updated) {
                    document.evaluation.push({evaluator: evaluator, rating: rating});
                }
                return document.save();
            }
        );
}

function createDocuments(documents) {
    return documentModel.create(documents);
}
