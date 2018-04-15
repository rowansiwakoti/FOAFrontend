(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .component('fvFooter', {
            templateUrl: 'components/footer/footer.html',
            controller: 'FooterController as footerCtrl'
        });
})();