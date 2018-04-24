(function () {
    'use strict';

    angular.module('FoodOrderingApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = [
        '$state',
        '$log',
        '$sessionStorage',
        'UserService',
        'APP_CONSTANT'
    ];

    function RegisterController($state, $log, $sessionStorage, UserService, APP_CONSTANT) {

        var vm = this;

        vm.firstNameReq = APP_CONSTANT.FIRST_NAME_REQ;
        vm.firstNameTooShort = APP_CONSTANT.FIRST_NAME_TOO_SHORT;
        vm.firstNameTooLong = APP_CONSTANT.FIRST_NAME_TOO_LONG;
        vm.middleNameTooShort = APP_CONSTANT.MIDDLE_NAME_TOO_SHORT;
        vm.middleNameTooLong = APP_CONSTANT.MIDDLE_NAME_TOO_LONG;
        vm.lastNameReq = APP_CONSTANT.LAST_NAME_REQ;
        vm.lastNameTooShort = APP_CONSTANT.LAST_NAME_TOO_SHORT;
        vm.lastNameTooLong = APP_CONSTANT.LAST_NAME_TOO_LONG;
        vm.invalidEmail = APP_CONSTANT.INVALID_EMAIL;
        vm.emailAddReq = APP_CONSTANT.EMAIL_ADD_REQ;
        vm.emailAddTooLong = APP_CONSTANT.EMAIL_ADD_TOO_LONG;
        vm.emailAddTooShort = APP_CONSTANT.EMAIL_ADD_TOO_SHORT;
        vm.contactNoReq = APP_CONSTANT.CONTACT_NO_REQ;
        vm.contactNoSize = APP_CONSTANT.CONTACT_NO_SIZE;
        vm.addressReq = APP_CONSTANT.ADDRESS_REQ;
        vm.addressTooLong = APP_CONSTANT.ADDRESS_TOO_LONG;
        vm.addressTooShort = APP_CONSTANT.ADDRESS_TOO_SHORT;
        vm.invalidAddress = APP_CONSTANT.INVALID_ADDRESS;
        vm.passwordReq = APP_CONSTANT.PASSWORD_REQ;
        vm.passwordTooLong = APP_CONSTANT.PASSWORD_TOO_LONG;
        vm.passwordTooShort = APP_CONSTANT.PASSWORD_TOO_SHORT;
        vm.numbersOnly = APP_CONSTANT.NUMBERS_ONLY;
        vm.alphabetsOnly = APP_CONSTANT.ALPHABETS_ONLY;

        vm.user = {};
        vm.dataLoading = false;
        vm.registerError = '';

        vm.backToLogin = backToLogin;
        vm.registerUser = registerUser;

        function backToLogin() {
            $state.go('login');
        }

        function registerUser(user) {
            vm.dataLoading = true;
            if (user.userPassword === user.confirmPassword) {

                UserService.setUser(user)
                    .then(
                        function (answer) {
                            $state.go('registrationSuccess');
                            $sessionStorage.checkEmail = answer.data.email;
                        },
                        function (error) {
                            vm.dataLoading = false;
                            vm.registerError = APP_CONSTANT.USER_ALREADY_EXIST;
                        }
                    );
            }
            else {
                vm.dataLoading = false;
                vm.registerError = APP_CONSTANT.PASSWORD_NOT_MATCH;
            }
        }
    }
})();