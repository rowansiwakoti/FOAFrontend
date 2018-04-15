(function(){
        'use strict';
        angular
            .module('FoodOrderingApp.Components.Compare',[]);
    }
)();

(function(){
    'use strict';

    angular.module('FoodOrderingApp.Components.Compare')
        .controller('CompareController',CompareController);

    CompareController.$inject = ['CompareFoodService','$localStorage','$scope' ,'$interval', 'OrderService'];

    function CompareController(CompareFoodService, $localStorage, $scope , $interval, OrderService){
        var vm = this;
        vm.removeCompareItem = CompareFoodService.removeCompareItem;
        vm.clearCompareList = CompareFoodService.clearCompare;

        vm.$onInit = function(){
            $interval(function(){
                vm.foodList = $localStorage.foodsForCompare;
            });
        };

        vm.addToCart = function(food){
            OrderService.addOrder(food);
        }
    }


})();