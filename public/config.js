(function () {

    angular
        .module('EvalApp')
        .config(config);
    
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', evalPage())
            .when('/login', loginPage)
            .otherwise('/', evalPage());
    }

    function evalPage() {
        return makeRoute('views/templates/evaluation.view.html', 'evaluationController', 'model');
    }

    function loginPage() {
        return makeRoute('views/templates/login.view.html', 'loginController', 'model');
    }

    function makeRoute(path, controller, alias) {

        return {
            templateUrl: path,
            controller: controller,
            controllerAs: alias,
            resolve: { status: checkAuthentication}
        }
    }

    function checkAuthentication($q, $http) {

        var deferred = $q.defer();
        $http
            .get('/api/authenticate')
            .then(
                function (response) {
                    var user = response.data;
                    deferred.resolve( {loggedIn: true, user: user} );
                },
                function (error) {
                    console.log(error);
                    deferred.resolve( {loggedIn: false, user: null} );
                }
            );
        return deferred.promise;
    }
})();