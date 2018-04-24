(() => {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('FoodController', FoodController);

    FoodController.$inject = [
        '$log',
        '$uibModalInstance',
        'FoodService',
        'APP_CONSTANT',
        'food',
        'foods'
    ];

    function FoodController($log, $uibModalInstance, FoodService, APP_CONSTANT, food, foods) {

        var vm = this;

        vm.foodNameReq = APP_CONSTANT.FOOD_NAME_REQ;
        vm.foodNameTooLong = APP_CONSTANT.FOOD_NAME_TOO_LONG;
        vm.foodNameTooShort = APP_CONSTANT.FOOD_NAME_TOO_SHORT;
        vm.foodPriceReq = APP_CONSTANT.FOOD_PRICE_REQ;
        vm.foodPriceLow = APP_CONSTANT.FOOD_PRICE_LOW;
        vm.foodPriceHigh = APP_CONSTANT.FOOD_PRICE_HIGH;
        vm.numbersOnly = APP_CONSTANT.NUMBERS_ONLY;
        vm.alphabetsOnly = APP_CONSTANT.ALPHABETS_ONLY;

        vm.food = {};

        vm.addFood = addFood;
        vm.addFoodConfirm = addFoodConfirm;
        vm.closeModal = closeModal;
        vm.editFood = editFood;
        vm.deleteFood = deleteFood;

        var foodList = foods;  // array of food for adding to a restaurant // array may contain single food also.
        var singleFood = food; // single food for adding or deleting


        vm.$onInit = () => {
            if (singleFood) {
                vm.food = angular.copy(singleFood);
                vm.copyFood = angular.copy(singleFood);
                vm.foodToBeDeleted = singleFood.name;
            }
        }

        function addFood(singleFood) {
            $uibModalInstance.close(singleFood);
        }


        function addFoodConfirm() {
            FoodService.addFoods(foodList).then(
                (success) => {
                    $uibModalInstance.close(success.data);
                },
                (error) => {
                    $log.error('Error occurred while adding foods to a restaurant ', error.status);
                }
            );
        }

        function closeModal() {
            $uibModalInstance.dismiss();
        }

        function editFood(singleFood) {
            FoodService.editFood(singleFood)
                .then(angular.noop, angular.noop);
            $uibModalInstance.close(singleFood);
        }

        function deleteFood() {
            FoodService.deleteFood(singleFood)
                .then(angular.noop, angular.noop);
            $uibModalInstance.close(singleFood);
        }
    }
})();