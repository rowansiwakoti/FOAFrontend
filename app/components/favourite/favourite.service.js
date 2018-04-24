(function () {
    'use strict';
    angular
        .module('FoodOrderingApp.Services.FavouriteRestaurant', []).factory('FavouriteRestaurantService', FavouriteRestaurantService);

    FavouriteRestaurantService.$inject = ['$http', 'APP_CONSTANT'];

    function FavouriteRestaurantService($http, APP_CONSTANT) {

        var appUrl = APP_CONSTANT.FOA_APP;

        var favRestService = {
            addToFavourite: addToFavourite,
            updateFavourite: updateFavourite,
            removeFavourite: removeFavourite,
            getFavourites: getFavourites
        }

        function addToFavourite(userId, restId) {
            // http://localhost:8080/api/users/5/favorites/14
            return $http.post(appUrl + '/api/users/' + userId + '/favorites/' + restId);
        }

        function updateFavourite(userId, restId){
            return $http.put(appUrl + '/api/users/' + userId + '/favorites/' + restId);
        }


        function removeFavourite(userId, restId){

        }

        function getFavourites(userId){
            return $http.get(appUrl + '/api/users/' + userId + '/favorites');
        }

        return favRestService;
    }


})();