(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('CartController', CartController);
    CartController.$inject = [
        '$uibModalInstance',
        'order',
        'previousOrders',
        'OrderService',
        'APP_CONSTANT'
    ];

    function CartController($uibModalInstance, order, previousOrders, OrderService, APP_CONSTANT) {

        var vm = this;
        vm.order = order;
        vm.quantity = 1;

        vm.totalAmount = totalAmount;
        vm.increaseOrder = increaseOrder;
        vm.decreaseOrder = decreaseOrder;
        vm.addToCart = addToCart;
        vm.closeModal = closeModal;
        vm.removeOrder = removeOrder;


        vm.$onInit = function () {
            //for updating the food quantity if we want to update the food quantity that has already been into the cart.
            if (previousOrders) {
                if (order) {
                    angular.forEach(previousOrders, function (eachOrder) {
                        if (eachOrder.id === order.id && eachOrder.name === order.name && eachOrder.restaurantName === order.restaurantName && eachOrder.price === order.price) {
                            vm.quantity = eachOrder.quantity;
                            vm.eachOrderQuantity = eachOrder.quantity;
                            vm.flag = true;
                        }
                    });
                }
            }
            totalAmount();
            updateOrder();
        };

        function totalAmount() {
            vm.amount = vm.quantity * vm.order.price;
        }

        function increaseOrder() {
            if (vm.quantity < APP_CONSTANT.MAX_ORDERS) {
                ++vm.quantity;
                totalAmount();
                updateOrder();
            }
        }

        function decreaseOrder() {
            if (vm.quantity > APP_CONSTANT.MIN_ORDERS) {
                --vm.quantity;
                totalAmount();
                updateOrder();
            }
        }

        function addToCart() {
            OrderService.addOrder(vm.order);
            $uibModalInstance.close();
        }

        function updateOrder() {
            vm.order.quantity = vm.quantity;
        }


        function closeModal() {
            $uibModalInstance.dismiss();
        }

        function removeOrder() {
            OrderService.deleteOrder(vm.order);
            vm.flag = false;
            vm.quantity = 1;
            vm.eachOrderQuantity = 0;
            totalAmount();
        }
    }
})();