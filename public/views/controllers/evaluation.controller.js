(function () {
    angular
        .module('EvalApp')
        .controller('evaluationController', evaluationController);
    
    function evaluationController(status) {
        var model = this;
        model.status = status;
        model.homeActive = 'active';
        model.urls = [];
        model.parse = parseUrls;
        model.currentIndex = 0;
        model.jumpIndex = 1;
        model.reportAvailable = false;
        model.isEvaluating = true;

        model.next = next;
        model.previous = previous;
        model.rateGood = rateGood;
        model.rateAverage = rateAverage;
        model.rateBad = rateBad;

        function parseUrls(evaluator, text) {

            var lines = text.split('\n');
            model.topic = '';

            for (i in lines){
                var line = lines[i].trim();

                if (line.length > 0) {

                    if (line[0] !== '#')
                        model.urls.push({url: line, evaluator: evaluator, rating: null});
                    else
                        model.topic = line;
                }
            }
        }

        function isEvaluationPending() {
            for (i in model.urls) {
                if (model.urls[i].rating == null)
                    return true;
            }
            return false;
        }

        function next() {
            if (model.currentIndex < model.urls.length-1)
                model.currentIndex += 1;
        }

        function previous() {
            model.currentIndex -= 1;
        }

        function rateGood() {
            rate('2');
        }

        function rateAverage() {
            rate('1');
        }

        function rateBad() {
            rate('0');
        }

        function rate(rating) {
            model.urls[model.currentIndex].rating = rating;
            model.reportAvailable = !isEvaluationPending();
            next();
        }
    }
})();