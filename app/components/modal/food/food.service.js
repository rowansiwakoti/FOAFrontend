(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('FoodService', FoodService);

    FoodService.$inject = [
        '$sessionStorage',
        '$http',
        'APP_CONSTANT'
    ];

    function FoodService($sessionStorage, $http, APP_CONSTANT) {

        var alertMessage = '';
        var foodList = [];
        var appUrl = APP_CONSTANT.FOA_APP;

        var foodSvc = {
            getFoodList: getFoodList,
            deleteFood: deleteFood,
            editFood: editFood,
            addFoods: addFoods,
            setAlertMessage: setAlertMessage,
            getAlertMessage: getAlertMessage,
            deleteFromAddFoods: deleteFromAddFoods
        };

        function getFoodList(id, pageNum) {
            return ($http.get(appUrl + '/restaurants/' + id + '/foods/' + pageNum + '/10'));
        }

        function deleteFood(food) {
            return ($http.delete(appUrl + '/foods/' + food.id));
        }

        function editFood(food) {
            var req = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: food,
                url: appUrl + '/foods/' + food.id
            }
            return ($http(req));
        }

        function addFoods(foods) {
            var foodList = [];
            angular.forEach(foods, function(food){
                foodList.push({
                    name: food.name,
                    price: food.price,
                    restaurantId: food.restaurantId
                });
            });
            var url = appUrl + '/foods';
            var req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: url,
                data: foodList
            }
            return ($http(req));
        }

        function setAlertMessage(msg) {
            alertMessage = msg;
        }

        function getAlertMessage() {
            return alertMessage;
        }

        function deleteFromAddFoods(id) {
            var addFoods = $sessionStorage.addFoods;
            var tempFoods = [];
            if (addFoods) {
                addFoods.forEach(function (food) {
                    if (food.restaurantId !== id) {
                        tempFoods.push(food);
                    }
                });
            }
            $sessionStorage.addFoods = tempFoods;
        }

        return foodSvc;
    }
})();