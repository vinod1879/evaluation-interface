
function documentService(app) {
    app.post('/api/document/bulk', isLoggedIn, bulkUpload);
    app.put ('/api/document/:documentId', isLoggedIn, rateDocument);
    app.get ('/api/document', isLoggedIn, findAllDocuments);
    app.get ('/api/document/:documentId', isLoggedIn, findById);
}

module.exports = documentService;

var documentModel = require('../model/document/document.model');

// MIDDLEWARE

function isLoggedIn(req, res, next) {

    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}

// HANDLERS

function bulkUpload(req, res) {

    var documents = req.body;

    for (var i=0; i < documents.length; i++) {
        documents[i]._id = i;
    }

    documentModel
        .createDocuments(documents)
        .then(
            function (response) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(401).json({message: error.message});
            }
        );
}

function rateDocument(req, res) {
    var username = req.user.firstName;
    var rating = req.body.rating;
    var docId = req.params.documentId;

    documentModel
        .updateEvaluation(docId, username, rating)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(401).json({message: error.message});
            }
        );
}

function findById(req, res) {
    var result = {};
    var docId = req.params.documentId;
    var nextDocId = parseInt(docId) + 1;
    var prevDocId = parseInt(docId) - 1;

    documentModel
        .findOne({_id: docId})
        .then(
            function (doc) {
                result.current = doc;
                return documentModel.findOne({_id: nextDocId});
            },
            function (error) {
                res.status(401).json({message: error.message});
            }
        )
        .then(
            function (doc) {
                result.next = doc;
                return documentModel.findOne({_id: prevDocId});
            },
            function (error) {
                res.status(401).json({message: error.message});
            }
        )
        .then(
            function (doc) {
                result.previous = doc;
                res.json(result);
            },
            function (error) {
                res.status(401).json({message: error.message});
            }
        );
}

function findAllDocuments(req, res) {

    documentModel
        .findAllDocuments()
        .then(
            function (documents) {
                res.json(documents);
            },
            function (error) {
                res.status(401).json({message: error.message});
            }
        );
}
