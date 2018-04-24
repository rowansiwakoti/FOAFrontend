(() => {
        'use strict';

        angular.module('FoodOrderingApp.Orders')
            .controller('OrdersController', TodaysOrdersController);

        TodaysOrdersController.$inject = ['$state', '$location', '$sessionStorage'];

        function TodaysOrdersController($state, $location, $sessionStorage) {
            var vm = this;

            vm.monthsOrder = monthsOrder;
            vm.todaysOrder = todaysOrder;


            vm.$onInit = () => {
                if ($location.path() === '/orders/month') {
                    vm.month = true;
                }
                else {
                    vm.today = true;
                }
                if(!$sessionStorage.role){
                    $state.go('login');
                }
            }

            function monthsOrder() {
                $state.go('orders.month');
            }

            function todaysOrder() {
                $state.go('orders.today');

            }
        }
    })();