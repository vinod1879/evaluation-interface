(function () {

    angular
        .module('EvalApp')
        .service('userService', userService);

    function userService($http) {

        this.login = login;
        this.logout = logout;

        function login(username, password) {
            return $http.post('/api/login', {username: username, password: password});
        }

        function logout() {
            return $http.post('/api/logout');
        }
    }
})();
