(function () {

    angular
        .module('EvalApp')
        .controller('homeController', homeController);

    function homeController(status, documentService) {
        var model = this;
        model.status = status;
        model.homeActive = 'active';
        model.getRating = getRating;
        var evaluator = model.status.user.firstName;

        function init() {
            documentService
                .findAll()
                .then(
                    function (response) {
                        model.documents = response.data;
                    },
                    function (error) {
                        model.documents = null;
                    }
                );
        }
        init();

        function getRating(doc) {

            for (var i in doc.evaluation) {
                if (doc.evaluation[i].evaluator == evaluator) {
                    return doc.evaluation[i].rating;
                }
            }

            return 'pending';
        }
    }
})();
