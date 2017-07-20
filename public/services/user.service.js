(function () {

    angular
        .module('EvalApp')
        .service('userService', userService);

    function userService($http) {

        this.login = login;

        function login(username, password) {
            return $http.post('/api/login', {username: username, password: password});
        }
    }
})();