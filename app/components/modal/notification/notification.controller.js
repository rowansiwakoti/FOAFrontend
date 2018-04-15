(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('NotificationController', NotificationController);

    NotificationController.$inject = [
        '$state',
        '$sessionStorage',
        '$uibModalInstance',
        'orderList',
        'UserService'
    ];

    function NotificationController($state, $sessionStorage, $uibModalInstance, orderList, UserService) {

        var vm = this;
        vm.orderList = orderList;
        vm.userRole = $sessionStorage.role;
        vm.name = [];

        //functions
        vm.closeModal = closeModal;
        vm.gotoOrder = gotoOrder;

        var users;
        vm.$onInit = function () {
            UserService.getUsers().then(function (response) {

                users = response.data;

                angular.forEach(vm.orderList, function (order) {

                    angular.forEach(users, function (user) {

                        if (order.userId === user.userId) {
                            vm.name.push({firstName: user.firstName, lastName: user.lastName});
                        }

                    });

                });

            }, function (response) {

            });

        };

        function closeModal() {
            $uibModalInstance.close();
        }

        function gotoOrder() {
            $state.go('orders.today');
            $uibModalInstance.close();
        }
    }
})();