(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('LogoutController', LogoutController);
    LogoutController.$inject = [
        '$rootScope',
        '$uibModalInstance',
        '$sessionStorage',
        '$state',
        'APP_CONSTANT'
    ];

    function LogoutController($rootScope, $uibModalInstance, $sessionStorage, $state, APP_CONSTANT) {

        var vm = this;
        vm.logoutMsg = APP_CONSTANT.LOGOUT_MSG;

        vm.ok = ok;
        vm.cancel = cancel;

        function ok() {
            clearSession();
            $rootScope.$broadcast('clearRole', $sessionStorage.role);
            $state.go('login');
            $uibModalInstance.close('close');
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function clearSession() {
           $sessionStorage.$reset();
           //  $sessionStorage.orderList = [];
        }
    }
})();