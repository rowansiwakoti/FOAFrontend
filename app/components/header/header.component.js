(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .component('fvHeader', {
            templateUrl: 'components/header/header.html',
            controller: 'HeaderController as headerCtrl'
        });
})();