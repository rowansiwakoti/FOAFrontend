(function () {
    'use strict';

    angular.module('FoodOrderingApp.Components.Favourite').controller('FavouriteController', FavouriteController);

    FavouriteController.$inject = ['$sessionStorage', '$timeout', '$state', 'FavouriteRestaurantService'];

    function FavouriteController($sessionStorage, $timeout, $state, FavouriteRestaurantService) {

        var vm = this;

        let userId = $sessionStorage.userId;

        vm.showRestaurants = false;
        vm.restaurants = [];

        //functions
        vm.gotoRestaurant = gotoRestaurant;

        vm.$onInit = function () {
            FavouriteRestaurantService.getFavourites(userId)
                .then(function (success) {
                    vm.showRestaurants = true;
                    $timeout(function () {
                        vm.restaurants = success.data;
                        vm.showRestaurants = false;
                    }, 1200);
                })
                .catch(function (error) {
                    vm.showRestaurants = false;
                });
        }

        function gotoRestaurant(restaurant) {
            $state.go('restaurant', {
                restaurant: restaurant
            });
        }
    }

})();