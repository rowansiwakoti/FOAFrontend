
(function(){
        'use strict';

        angular
            .module('FoodOrderingApp.Components.Favourite')
            .config(config);

        config.$inject = ['$stateProvider'];

        function config ($stateProvider) {
            $stateProvider
                .state('FavouriteList', {
                    url: '/favourite',
                    templateUrl: 'components/favourite/favourite.html',
                    controller: 'FavouriteController as favCtrl'
                });
        }
    }
)();