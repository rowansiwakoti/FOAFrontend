(function(){
        'use strict';
        angular
            .module('FoodOrderingApp.Services.FoodCompare',[]);
    }
)();

(function(){
    'use strict';

    angular.module('FoodOrderingApp.Services.FoodCompare')
        .factory('CompareFoodService',CompareFoodService);

    CompareFoodService.$inject= ['$localStorage','Utility'];

    function CompareFoodService($localStorage, Utility){

        var vm = this;
        vm.compareFoods = [];

        var compareFoodSvc = {
            getCompareList: getCompareList,
            addToCompareList: addToCompareList,
            removeCompareItem: removeCompareItem,
            clearCompare: clearCompareList,
        };

        function getCompareList(){
            return $localStorage.foodsForCompare;
        }

        function addToCompareList(food){
            var previousFoods = $localStorage.foodsForCompare;

            if(Utility.isEmpty(previousFoods)) {
                vm.compareFoods.push(food);
            }
            else{
                vm.compareFoods = previousFoods;
                vm.compareFoods.push(food);
            }
            $localStorage.foodsForCompare = vm.compareFoods;
        }

        function removeCompareItem(foodId){
            var foods = $localStorage.foodsForCompare;
            angular.forEach(foods, function(eachFood,index){
                if(eachFood.id === foodId)
                    foods.splice(index,1);
            })
        }

        function clearCompareList(){
            // localStorage.clear();
            // $localStorage.foodsForCompare = [];
            // localStorage.removeItem('foodsForCompare');
             delete $localStorage.foodsForCompare;
        }

        return compareFoodSvc;
    }
})();