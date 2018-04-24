(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('RestaurantService', RestaurantService);
    RestaurantService.$inject = [
        '$http',
        'FoodService',
        'APP_CONSTANT',
        '$sessionStorage',
        'ApiService'
    ];

    function RestaurantService($http, FoodService, APP_CONSTANT, $sessionStorage, ApiService) {

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
            var path = '/restaurants';
            var headers ={'Content-Type': undefined};
            // var transformRequest = angular.identity;
            return ApiService.post(path, null, restaurant, headers, null, null);
            // return $http.post(appUrl + '/restaurants', restaurant, {
            //     headers: {'Content-Type': undefined},
            //     transformRequest: angular.identity,
            // });
        }

        function deleteRestaurant(restaurant) {
            FoodService.deleteFromAddFoods(restaurant.id);
            return ($http.delete(appUrl + '/restaurants/' + restaurant.id));
        }

        function editRestaurant(restaurant, restaurantId) {
            // console.log(restaurant);
            var path = '/restaurants/'+restaurantId;
            var headers ={'Content-Type': undefined};
            return ApiService.post(path, null, restaurant, headers, null, null);
            // console.log(restaurant);
            // var req = {
            //     method: 'POST',
            //     // cache: true,
            //     headers: {
            //         'Content-Type': undefined
            //     },
            //     url: appUrl + '/restaurants/' + restaurantId,
            //     data: restaurant
            // }
            // return ($http(req));
        }

        // function editRestaurant(restaurant) {
        //     var fd = new FormData();
        //     fd.append('files', restaurant.files);
        //     // fd.append('name',restaurant.name)
        //     // restaurant.files = fd;
        //     fd.append('name', restaurant.name);
        //     fd.append('address',restaurant.address);
        //     fd.append('contact',restaurant.contact);
        //
        //     console.log(restaurant.id);
        //     return $http.post(appUrl + '/restaurants/' + restaurant.id, fd, {
        //         headers: {'Content-Type': undefined},
        //         transformRequest: angular.identity,
        //     });
        // }

        function getRestaurantList(id) {
            // id = 0;
            if ($sessionStorage.role === 'user') {
                var path = '/restaurants/user/paginate';
                var params = {firstResult:id, maxResult:6}
                return ApiService.get(path, params);
                // return ($http.get(appUrl + '/restaurants/user/paginate/' + id + '/6'));
            }
            else if ($sessionStorage.role === 'admin') {
                var path = '/restaurants/admin/paginate';
                var params = {firstResult:id, maxResult:6}
                return ApiService.get(path, params);

                // var params = {firstResult:id, maxResult:6}
                // return ($http.get(appUrl + '/restaurants/admin/paginate',params));

                // return ($http.get(appUrl + '/restaurants/admin/paginate/' + id + '/6'));
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