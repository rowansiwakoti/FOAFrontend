(() => {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('HeaderController', HeaderController);
    HeaderController.$inject = [
        '$sessionStorage',
        '$uibModal',
        '$rootScope',
        '$interval',
        'APP_CONSTANT',
        'OrderService',
        '$scope',
        '$state',
        '$log'
    ];

    function HeaderController($sessionStorage, $uibModal, $rootScope, $interval, APP_CONSTANT, OrderService, $scope, $state, $log) {

        var vm = this;

        vm.balance = null;
        vm.orderList = [];
        vm.orders = [];
        vm.orderLength;


        vm.appName = appName;
        vm.openWallet = openWallet;
        vm.openCart = openCart;
        vm.openNotification = openNotification;
        vm.initOrderList = initOrderList;

        //update order list to receive
        $scope.$on('updateOrder', (event, data) => {
            vm.orders = data;
            $scope.$digest();
        })

        vm.$onInit = () => {
            vm.order = $sessionStorage.orderList;
            vm.role = $sessionStorage.role;

            if ($sessionStorage.balance) {
                vm.balance = $sessionStorage.balance;
            }
            if ($sessionStorage.orderList) {
                vm.orderList = $sessionStorage.orderList;
            }
            vm.initOrderList();
        }

        $scope.$on('loggedIn', (event) => {
            if (vm.orders.length <= 0) {
                vm.initOrderList();
            }
        });

        $scope.$on('updateOrdersAfterConfirm', (event, data) => {
            vm.order = data;
        });

        $scope.$on('instantUpdateRole', (event, data) => {
            $sessionStorage.role = data;
            vm.role = $sessionStorage.role;
            vm.orderList = $sessionStorage.orderList;
        });

        $scope.$on('instantUpdateBalance', (event, data) => {
            vm.balance = data;
        });

        $scope.$on('clearRole', (event, data) => {
            vm.role = data;
            $sessionStorage.orderList = [];
        });

        $scope.$on('updateOrders', (event, data) => {
            vm.order = data;
        });

        function appName() {
            return APP_CONSTANT.APP_NAME;
        }

        function openNotification() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                backdrop: false,
                templateUrl: "components/modal/notification/notification.html",
                controller: "NotificationController",
                controllerAs: "notificationCtrl",
                size: "sm",
                resolve: {
                    orderList: () => vm.orders // equivalent to: => { return expression; }
                }
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }

        function openWallet() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: "components/modal/profile/user-profile.modal.html",
                controller: "UserProfileController",
                controllerAs: "userProfileCtrl",
                size: 'sm',
                resolve: {
                    balance: () => vm.balance // equivalent to: => { return expression; }
                }
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }

        function openCart() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/order/order-cart.html',
                controller: 'OrderModalController',
                controllerAs: 'orderModalCtrl',
                size: 'lg'
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }

        var date = new Date();
        date = date.toISOString().slice(0, 10);

        function _checkConfirm(orders) {
            return new Promise((resolve, reject) => {
                resolve(orders.filter((order) => {
                    if (order.confirm === false) {
                        return order;
                    }
                }));
            });
        }

        function initOrderList() {
            if ($sessionStorage.role === 'admin') {
                vm.orders = [];

                OrderService.getOrderList()
                    .then(
                        (success) => {
                            vm.call = _checkConfirm(success.data);
                            vm.call.then((data) => {
                                vm.orders = data;
                                $scope.$digest();
                                $sessionStorage.orders = success.data;
                                $rootScope.$broadcast('getOrderList', success.data);
                            });
                        },
                        (error) => {
                            $log.error(error.data.message);
                        }
                    );
            }
            else if ($sessionStorage.role === 'user') {
                vm.orders = [];
                OrderService.getOrderList()
                    .then(
                        (success) => {
                            angular.forEach(success.data, (order) => {
                                if (order.confirm === true) {
                                    vm.orders.push(order);
                                }
                            })
                            $sessionStorage.orders = success.data;
                            $rootScope.$broadcast('getOrderList', success.data);
                        },
                        (error) => {
                            $log.error(error.data.message);
                        }
                    );
            }
        }

        $interval(() => {
            vm.orderLength = vm.orders.length;
            vm.initOrderList();
            $scope.$emit('newTodayOrders');
        }, 10000);
    }
})();