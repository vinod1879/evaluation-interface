(function () {

    angular
        .module('EvalApp')
        .controller('addController', addController);

    function addController(status, documentService, $location) {
        var model = this;
        model.status = status;
        model.documentActive = 'active';
        model.addBulk = addBulk;
        
        function addBulk(text) {
            var lines = text.split('\n');
            var documents = [];
            var topic = '';
            for (i in lines){
                var line = lines[i].trim();

                if (line.length > 0) {

                    if (line[0] !== '#')
                        documents.push({url: line, topic: topic});
                    else
                        topic = line;
                }
            }

            documentService
                .createBulk(documents)
                .then(
                    function (response) {
                        $location.url('/');
                    },
                    function (error) {
                        model.message = error.data.message;
                    }
                );
        }
    }
})();
