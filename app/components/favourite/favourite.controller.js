
(function(){
    'use strict';

    angular.module('FoodOrderingApp.Components.Favourite')
        .controller('FavouriteController',FavouriteController);

    FavouriteController.$inject = [];

    function FavouriteController() {
        var vm = this;
        console.log('this is FavouriteController');
    }

})();