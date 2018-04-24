(() => {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('RestaurantService', RestaurantService);
    RestaurantService.$inject = [
        '$http',
        'FoodService',
        'APP_CONSTANT',
        '$sessionStorage'
    ];

    function RestaurantService($http, FoodService, APP_CONSTANT, $sessionStorage) {

        var alertMessage = '';
        var appUrl = APP_CONSTANT.FOA_APP;

        var restaurantSvc = {
            addRestaurant: addRestaurant,
            deleteRestaurant: deleteRestaurant,
            editRestaurant: editRestaurant,
            getRestaurantList: getRestaurantList,
            setAlertMessage: setAlertMessage,
            getAlertMessage: getAlertMessage,
            activateRestaurant: activateRestaurant,
            deactivateRestaurant: deactivateRestaurant

        };

        function addRestaurant(restaurant) {
            return $http.post(appUrl + '/restaurants', restaurant, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            });
        }

        function deleteRestaurant(restaurant) {
            FoodService.deleteFromAddFoods(restaurant.id);
            return ($http.delete(appUrl + '/restaurants/' + restaurant.id));
        }

        function editRestaurant(restaurant) {
            var req = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: appUrl + '/restaurants/' + restaurant.id,
                data: restaurant
            }
            return ($http(req));
        }

        function getRestaurantList(id) {
            if ($sessionStorage.role === 'user') {
                return ($http.get(appUrl + '/restaurants/user/paginate/' + id + '/6'));
            }
            else if ($sessionStorage.role === 'admin') {
                return ($http.get(appUrl + '/restaurants/admin/paginate/' + id + '/6'));
            }
        }

        function setAlertMessage(msg) {
            alertMessage = msg;
        }

        function getAlertMessage() {
            return alertMessage;
        }

        function activateRestaurant(id) {
            return $http.get(appUrl + '/restaurants/' + id + '/activate');
        }

        function deactivateRestaurant(id) {
            return $http.get(appUrl + '/restaurants/' + id + '/deactivate');
        }
        return restaurantSvc;
    }
})();