(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('OrderModalController', OrderModalController);
    OrderModalController.$inject = [
        '$uibModalInstance',
        '$sessionStorage',
        '$state',
        '$uibModal',
        '$rootScope',
        'OrderService',
        'RestaurantService',
        'APP_CONSTANT'
    ];

    function OrderModalController($uibModalInstance, $sessionStorage, $state, $uibModal, $rootScope, OrderService, RestaurantService, APP_CONSTANT) {

        var vm = this;
        vm.order = OrderService.getOrder();
        vm.quantity = [];

        vm.deleteOrder = deleteOrder;
        vm.increaseQuantity = increaseQuantity;
        vm.decreaseQuantity = decreaseQuantity;
        vm.getTotal = getTotal;
        vm.orderFood = orderFood;
        vm.modalCancel = modalCancel;
        vm.orderOk = orderOk;
        vm.continueOrder = continueOrder;


        function deleteOrder(order) {
            OrderService.deleteOrder(order);
            vm.order = OrderService.getOrder();
        }

        function increaseQuantity(food) {
            OrderService.increaseQuantity(food);
            vm.order = OrderService.getOrder();
        }

        function decreaseQuantity(food) {
            OrderService.decreaseQuantity(food);
            vm.order = OrderService.getOrder();
        }

        function getTotal() {
            var total = 0;
            if (vm.order) {
                angular.forEach(vm.order, function (order) {
                    total += order.price * order.quantity;
                });
            }
            return total;
        }

        function orderFood() {
            $uibModalInstance.close();
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/order/order-confirm-modal.html',
                controller: 'OrderModalController',
                controllerAs: 'orderModalCtrl',
                size: 'sm'
            });
            modalInstance.result.then(
                function () {
                    $rootScope.$broadcast("infoMsg", RestaurantService.setAlertMessage(APP_CONSTANT.ORDER_INFO_MSG));
                },
                angular.noop);
        }

        function modalCancel() {
            $uibModalInstance.dismiss();
        }

        function orderOk() {
            $sessionStorage.userOrders = $sessionStorage.orderList;
            $sessionStorage.orderList=[];
            confirmOrder();
            $uibModalInstance.close();
        }

        function confirmOrder() {
            var orderedItems = [];
            var totalAmount = 0;
            var id = $sessionStorage.userId;

            angular.forEach(vm.order, function (order) {
                totalAmount += (order.quantity * order.price);
                orderedItems.push({
                    foodName: order.name,
                    foodPrice: order.price,
                    restaurantName: order.restaurantName,
                    quantity: order.quantity
                });
            });
            OrderService.confirmOrder({userId: id, foodList: orderedItems});
            /*var balance = $sessionStorage.balance;
            balance -= totalAmount;
            $sessionStorage.balance = balance;*/
            // $rootScope.$broadcast('instantUpdateBalance', $sessionStorage.balance);
            $rootScope.$broadcast('updateOrdersAfterConfirm', '');
        }

        function continueOrder() {
            $state.go('dashboard');
            $uibModalInstance.dismiss();
        }
    }
})();