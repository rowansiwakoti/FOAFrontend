(() => {
        'use strict';
        angular
            .module('FoodOrderingApp.Components.Login',[]);
    }
)();

// (() => {
//         'use strict';
//
//         angular
//             .module('FoodOrderingApp.Components.Login')
//             .config(config);
//
//         config.$inject = ['$stateProvider'];
//
//         function config ($stateProvider) {
//             $stateProvider
//                 .state('login', {
//                     url: '/login',
//                     templateUrl: 'components/login/login.html',
//                     controller: 'LoginController as loginCtrl'
//                 });
//         }
//     }
// )();

(() => {

    'use strict';
    angular.module('FoodOrderingApp.Components.Login')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$rootScope',
        '$state',
        '$sessionStorage',
        '$log',
        'APP_CONSTANT',
        'UserService'
    ];

    function LoginController($rootScope, $state, $sessionStorage, $log, APP_CONSTANT, UserService) {

        var vm = this;

        vm.user = {};
        vm.inputType = 'password';
        vm.dataLoading = false;

        vm.validateUser = validateUser;

        function validateUser(user) {
            vm.dataLoading = true;
            UserService.validateUser(user)
                .then(
                    (success) => {
                        if (success.data) {
                            saveDataToSession(success.data);
                            $rootScope.$broadcast('instantUpdateBalance', $sessionStorage.balance);
                            $rootScope.$broadcast('instantUpdateRole', $sessionStorage.role);
                            vm.dataLoading = false;
                            $state.go('dashboard');
                        }
                    },
                    (error) => {
                        vm.errorMsg = APP_CONSTANT.USERNAME_NOT_EXIST;
                        vm.dataLoading = false;
                        $log.error('Error occurred while validating user ', error.status);
                    }
                );
        }

        function saveDataToSession(data) {
            $sessionStorage.userId = data.userId;
            $sessionStorage.firstName = data.firstName;
            $sessionStorage.middleName = data.middleName;
            $sessionStorage.lastName = data.lastName;
            $sessionStorage.contact = data.contactNo;
            $sessionStorage.address = data.address;
            $sessionStorage.role = data.userRole;
            $sessionStorage.emailId = data.email;
            $sessionStorage.balance = data.balance;
        }
    }
})();