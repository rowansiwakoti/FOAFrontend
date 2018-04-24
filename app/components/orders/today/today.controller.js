(() => {
    'use strict';

    angular.module('FoodOrderingApp.Orders')
        .controller('TodayController', TodayController);

    TodayController.$inject = ['$sessionStorage', '$state', 'OrderService', '$rootScope'];

    function TodayController($sessionStorage, $state, OrderService, $rootScope) {
        var vm = this;

        vm.orders = [];

        vm.role = $sessionStorage.role;

        vm.acceptOrder = acceptOrder;
        vm.generateBill = generateBill;
        vm.checkConfirm = checkConfirm;

        vm.$onInit = () => {
            OrderService.getOrderList()
                .then(
                    (success) => {
                        if (success.data) {
                            vm.orders = success.data;
                            angular.forEach(vm.orders, (order) => {
                                order.total = _add(order.foodResRequestDtoList);
                            });
                        }
                    },
                    (error) => {
                    }
                );
        };

        function _add(orders) {
            var total = 0;
            if (orders) {
                angular.forEach(orders, (order) => {
                    total += order.foodPrice * order.quantity;
                });
                return total;
            }
        }

        function checkConfirm(orders) {
            return new Promise((resolve, reject) => {
                resolve(orders.filter((order) => {
                    if (order.confirm === false) {
                        return order;
                    }
                }));
            });
        }

        function accept(orderId) {
            return new Promise((resolve, reject) => {
                angular.forEach(vm.orders, (order, index) => {
                    if (order.orderId === orderId) {
                        order.confirm = true;
                        resolve(true);
                    }
                });
            });
        }

        function acceptOrder(orderId) {
            OrderService.receiveOrder(orderId)
                .then((success) => {
                if (vm.orders.length > 0) {
                    var callAccept = accept(orderId);
                    callAccept.then((data) => {
                        var call = checkConfirm(vm.orders);
                        call.then((data) => {
                            $rootScope.$broadcast('updateOrder', data);
                        });
                    });
                }
            }, (error) => {
            });
        }

        function generateBill(order) {
            if (vm.role === 'user') {
                $sessionStorage.orderBill = order;
                $state.go('orderBill', {order: order});
            }
        }
    }
})();