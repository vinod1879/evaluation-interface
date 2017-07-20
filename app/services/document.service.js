
function documentService(app) {
    app.post('/api/document/bulk', isLoggedIn, bulkUpload);
    app.put ('/api/document/:documentId', isLoggedIn, rateDocument);
    app.get ('/api/document', isLoggedIn, findAllDocuments);
    app.get ('/api/document/:documentId', isLoggedIn, findById);
    app.get ('/api/download/report', isLoggedIn, buildReport);
}

module.exports = documentService;

var documentModel = require('../model/document/document.model');
var userModel = require('../model/user/user.model');

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

function buildReport(req, res) {
    documentModel
        .find()
        .sort({queryId: 1, _id: 1, 'evaluation.evaluator': 1})
        .then(
            function (documents) {
                var text = '';
                text += 'queryID' + '\t' + 'DOCID' + '\t';
                text += 'judge1' + '\t' + 'judge2' + '\t';
                text += 'judge3' + '\n';

                for (var i in documents) {
                    var doc = documents[i];
                    text += doc.queryId + '\t';
                    text += doc.url;

                    for (var j=0; j < doc.evaluation.length; j++) {
                        text += '\t' + doc.evaluation[j].rating;
                    }
                    text += '\n';
                }
                text = text.trim();

                res.set({"Content-Disposition": "attachment; filename=\"report.txt\""});
                res.send(text);
            },
            function (error) {
                res.status(401).json({message: 'Download Failed!'});
            }
        );
}
