(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('WarnOnLeaveController', WarnOnLeaveController);

    WarnOnLeaveController.$inject = [
        '$uibModalInstance'
    ];

    function WarnOnLeaveController($uibModalInstance) {

        var vm = this;

        vm.okay = okay;
        vm.cancel = cancel;

        function okay() {
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }
})();