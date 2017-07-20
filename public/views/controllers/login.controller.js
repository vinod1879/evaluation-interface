(function () {

    angular
        .module('EvalApp')
        .controller('loginController', loginController);

    function loginController(userService, $location) {
        var model = this;

        model.login = login;

        function login(username, password) {

            userService
                .login(username, password)
                .then(
                    function (response) {
                        $location.url('/');
                    },
                    function (error) {
                        model.message = 'Invalid username/password';
                    }
                );
        }
    }
})();