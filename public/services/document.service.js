(function () {

    angular
        .module('EvalApp')
        .service('documentService', documentService);

    function documentService($http) {

        this.createBulk = createBulk;
        this.updateEvaluation = updateEvaluation;
        this.findAll = findAll;
        this.findById = findById;

        function createBulk(documents) {
            return $http.post('/api/document/bulk', documents);
        }

        function updateEvaluation(docId, rating) {
            return $http.put('/api/document/' + docId, {rating: rating});
        }

        function findAll() {
            return $http.get('/api/document');
        }

        function findById(docId) {
            return $http.get('/api/document/' + docId);
        }
    }
})();
