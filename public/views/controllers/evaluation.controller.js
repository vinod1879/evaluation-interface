(function () {
    angular
        .module('EvalApp')
        .controller('evaluationController', evaluationController);
    
    function evaluationController(status, $routeParams, $location, documentService) {
        var model = this;
        model.status = status;
        model.homeActive = 'active';
        model.currentIndex = parseInt($routeParams['docId']);

        model.next = next;
        model.previous = previous;
        model.rateGood = rateGood;
        model.rateAverage = rateAverage;
        model.rateBad = rateBad;
        model.isRatedGood = isRatedGood;
        model.isRatedBad = isRatedBad;
        model.isRatedAverage = isRatedAverage;
        model.jumpToDocument = jumpToDocument;

        init();
        function init() {
            documentService
                .findById(model.currentIndex)
                .then(
                    function (response) {
                        if (response.data.current == null) {
                            alert('No such document!');
                            $location.url('/document/');
                            return;
                        }
                        model.currentDocument = response.data.current;
                        model.nextDocument = response.data.next;
                        model.previousDocument = response.data.previous;
                    }
                );
        }

        function jumpToDocument() {
            var orig = parseInt($routeParams['docId']);
            if (model.currentIndex != "" && orig != model.currentIndex) {
                $location.url('/document/' + model.currentIndex);
            }
        }

        function next() {
            $location.url('/document/' + (model.currentIndex+1));
        }

        function previous() {
            $location.url('/document/' + (model.currentIndex-1));
        }

        function rateGood() {
            rate(2);
        }

        function rateAverage() {
            rate(1);
        }

        function rateBad() {
            rate(0);
        }

        function rate(rating) {

            documentService
                .updateEvaluation(model.currentIndex, rating)
                .then(
                    function (response) {
                        if (model.nextDocument) {
                            next();
                        }
                        else {
                            $location.url('/');
                        }
                    }
                );
        }

        function isRatedGood() {
            return checkRating(2);
        }

        function isRatedAverage() {
            return checkRating(1);
        }

        function isRatedBad() {
            return checkRating(0);
        }

        function checkRating(rating) {
            var evaluator = status.user.firstName;

            if (!model.currentDocument || !model.currentDocument.evaluation)
                return false;

            for (var i in model.currentDocument.evaluation) {
                if (model.currentDocument.evaluation[i].evaluator == evaluator) {
                    return model.currentDocument.evaluation[i].rating == rating;
                }
            }
            return false;
        }
    }
})();