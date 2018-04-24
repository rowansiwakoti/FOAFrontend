(() => {
    'use strict';

    angular.module('FoodOrderingApp')
        .controller('RegistrationSuccessController', RegistrationSuccessController);

    RegistrationSuccessController.$inject = [
        '$state',
        '$sessionStorage'
    ];

    function RegistrationSuccessController($state, $sessionStorage) {

        var vm = this;

        vm.gotoLogin = gotoLogin;

        if (angular.isUndefined($sessionStorage.checkEmail) || $sessionStorage.checkEmail === '') {
            $state.go('login');
        }

        function gotoLogin() {
            $state.go('login');
        }
    }
})();