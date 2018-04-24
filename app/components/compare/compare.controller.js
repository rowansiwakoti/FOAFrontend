(() => {
        'use strict';
        angular
            .module('FoodOrderingApp.Components.Compare',[]);
    }
)();

(() => {
    'use strict';

    angular.module('FoodOrderingApp.Components.Compare')
        .controller('CompareController',CompareController);

    CompareController.$inject = ['CompareFoodService','$localStorage','$scope' ,'$interval', 'OrderService'];

    function CompareController(CompareFoodService, $localStorage, $scope , $interval, OrderService){
        var vm = this;
        vm.removeCompareItem = CompareFoodService.removeCompareItem;
        vm.clearCompareList = CompareFoodService.clearCompare;

        vm.addToCart = addToCart;

        vm.$onInit = () => {
            $interval(() => {
                vm.foodList = $localStorage.foodsForCompare;
            });
        };

        function addToCart(food){
            OrderService.addOrder(food);
        }
    }


})();