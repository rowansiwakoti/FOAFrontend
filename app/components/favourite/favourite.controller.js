(() => {
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

        vm.$onInit = () => {
            FavouriteRestaurantService.getFavourites(userId)
                .then((success) => {
                    vm.showRestaurants = true;
                    $timeout(() => {
                        vm.restaurants = success.data;
                        vm.showRestaurants = false;
                    }, 1200);
                })
                .catch((error) => {
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