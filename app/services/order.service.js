(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('OrderService', OrderService);

    OrderService.$inject = [
        '$sessionStorage',
        '$http',
        '$rootScope',
        'APP_CONSTANT'
    ];

    function OrderService($sessionStorage, $http, $rootScope, APP_CONSTANT) {

        var orderList = [];
        var appUrl = APP_CONSTANT.FOA_APP;

        var orderSvc = {
            addOrder: addOrder,
            confirmOrder: confirmOrder,
            deleteOrder: deleteOrder,
            getOrder: getOrder,
            increaseQuantity: increaseQuantity,
            decreaseQuantity: decreaseQuantity,
            getOrderList: getOrderList,
            receiveOrder: receiveOrder,
            getMonthsOrderList: getMonthsOrderList
        };

        function getMonthsOrderList() {
            var role = $sessionStorage.role;
            if (role === 'user') {
                return ($http.get(appUrl + '/order/userList/' + $sessionStorage.userId));
            }
            else {
                return ($http.get(appUrl + '/order/admin/month'));
            }
        }

        function addOrder(order) {
            var flag = 1;
            // set flag to zero // ignores duplicate order
            if ($sessionStorage.orderList) {
                angular.forEach($sessionStorage.orderList, function (item) {
                    if (item.id === order.id) {
                        flag = 0;
                        item.quantity = order.quantity;
                    }
                });
            }

            if (flag === 1) {
                if ($sessionStorage.orderList) {
                    orderList = $sessionStorage.orderList;
                    orderList.push(order);
                    $sessionStorage.orderList = orderList;
                }
                else {
                    orderList.push(order);
                    $sessionStorage.orderList = orderList;
                    orderList = $sessionStorage.orderList;
                }
            }
            $rootScope.$broadcast('updateOrders', orderList);
        }

        function confirmOrder(order) {
            var req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: order,
                url: appUrl + '/order'
            };
            return ($http(req));
        }

        function deleteOrder(order) {
            var flag = 1;
            var position;
            if ($sessionStorage.orderList) {
                for (var i = 0; i < $sessionStorage.orderList.length; i++) {
                    if (order.id === $sessionStorage.orderList[i].id) {
                        position = i;
                    }
                }
                $sessionStorage.orderList.splice(position, 1);
            }
        }

        function getOrder() {
            if ($sessionStorage.orderList) {
                return $sessionStorage.orderList;
            }
        }

        function increaseQuantity(food) {
            if (food.quantity < APP_CONSTANT.MAX_ORDERS) {
                for (var i = 0; i < $sessionStorage.orderList.length; i++) {
                    if (food.id === $sessionStorage.orderList[i].id) {
                        $sessionStorage.orderList[i].quantity += 1;
                    }
                }
            }
        }

        function decreaseQuantity(food) {
            if (food.quantity > APP_CONSTANT.MIN_ORDERS) {
                for (var i = 0; i < $sessionStorage.orderList.length; i++) {
                    if (food.id === $sessionStorage.orderList[i].id) {
                        $sessionStorage.orderList[i].quantity -= 1;
                    }
                }
            }
        }

        function getOrderList() {
            if ($sessionStorage.role === 'admin') {
                return ($http.get(appUrl + '/order/admin/today'));
            }
            else if ($sessionStorage.role === 'user') {
                return ($http.get(appUrl + '/order/user/' + $sessionStorage.userId));
            }
        }

        function receiveOrder(id) {
            return ($http.put(appUrl + '/order/confirm/' + id));
        }

        return orderSvc;
    }
})();