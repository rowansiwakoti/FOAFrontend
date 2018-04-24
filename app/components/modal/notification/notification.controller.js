(() => {
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
        vm.$onInit = () => {
            UserService.getUsers()
                .then((success) => {

                users = success.data;

                angular.forEach(vm.orderList, (order) => {

                    angular.forEach(users, (user) => {

                        if (order.userId === user.userId) {
                            vm.name.push({firstName: user.firstName, lastName: user.lastName});
                        }

                    });

                });

            }, (error) => {

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