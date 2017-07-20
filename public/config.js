(function () {

    angular
        .module('EvalApp')
        .config(config);
    
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', evalPage())
            .when('/login', loginPage())
            .when('/logout', logoutPage())
            .otherwise('/', evalPage());
    }

    function evalPage() {
        return makeRoute('views/templates/evaluation.view.html', 'evaluationController', 'model', true);
    }

    function loginPage() {
        return makeRoute('views/templates/login.view.html', 'loginController', 'model', false);
    }

    function logoutPage() {
        return {
            template: '<p>Logging out...</p>',
            controller: 'logoutController',
            controllerAs: 'model'
        }
    }

    function makeRoute(path, controller, alias, authenticate) {

        if (authenticate) {
            return {
                templateUrl: path,
                controller: controller,
                controllerAs: alias,
                resolve: { status: checkAuthentication}
            }
        }
        else {
            return {
                templateUrl: path,
                controller: controller,
                controllerAs: alias,
                resolve: { status: resolveDefault}
            }
        }
    }

    function checkAuthentication($q, $http, $location) {

        var deferred = $q.defer();
        $http
            .get('/api/authenticate')
            .then(
                function (response) {
                    var user = response.data;
                    console.log('Resolved with status OK');
                    deferred.resolve( {loggedIn: true, user: user} );
                },
                function (error) {
                    console.log(error);
                    deferred.reject();
                    $location.url('/login');
                }
            );
        return deferred.promise;
    }

    function resolveDefault($q, $http, $location) {
        var deferred = $q.defer();
        $http
            .get('/api/authenticate')
            .then(
                function (response) {
                    deferred.reject();
                    $location.url('/');
                },
                function (error) {
                    deferred.resolve(false);
                }
            );
        return deferred.promise;
    }
})();