(function () {
    angular
        .module('EvalApp')
        .controller('logoutController', logoutController);

    function logoutController($location, userService) {

        userService
            .logout()
            .then(
                function (response) {
                    $location.url('/');
                }
            )
    }
})();