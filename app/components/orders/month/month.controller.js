(() => {
    'use strict';

    angular.module('FoodOrderingApp.Orders')
        .controller('MonthController', MonthController);

    MonthController.$inject = ['$sessionStorage', '$state', '$rootScope', 'OrderService', 'UserService', '$scope'];

    function MonthController($sessionStorage, $state, $rootScope, OrderService, UserService, $scope) {
        var vm = this;

        vm.orders = [];

        vm.role = $sessionStorage.role;

        vm.generateBill = generateBill;
        vm.balance = $sessionStorage.balance;

        $rootScope.$on('newTodayOrders', (event) => {
        });

        vm.$onInit = () => {
            vm.totalAmount = 0;

            OrderService.getMonthsOrderList()
                .then(
                    (success) => {

                        angular.forEach(success.data, (order) => {
                            if (order.confirm === true) {
                                vm.orders.push(order);
                                angular.forEach(order.foodResRequestDtoList, (food) => {
                                    vm.totalAmount += (food.quantity * food.foodPrice);
                                });
                                var balance = 1200;
                                balance -= vm.totalAmount;
                                $sessionStorage.balance = balance;
                                $rootScope.$broadcast('instantUpdateBalance', $sessionStorage.balance);
                            }
                        });
                    },
                    (error) => {
                    }
                );
        };

        function generateBill(order) {
            if (vm.role === 'user') {
                $sessionStorage.orderBill = order;
                $state.go('orderBill', {order: order});
            }
        }
    }
})();