(function () {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('OrderBillController', OrderBillController);

    OrderBillController.$inject = [
        '$sessionStorage',
        '$state',
        '$stateParams'
    ];

    function OrderBillController($sessionStorage, $state, $stateParams) {

        var vm = this;

        var middleName = $sessionStorage.middleName || '';
        vm.fullName = $sessionStorage.firstName + ' ' + middleName + ' ' + $sessionStorage.lastName;
        vm.address = $sessionStorage.address;
        vm.contact = $sessionStorage.contact;
        vm.todayDate = new Date();
        vm.total = 0;

        vm.printBillReceipt = printBillReceipt;

        vm.$onInit = function () {
            if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }
            if ($stateParams.order) {
                $sessionStorage.userOrders = $stateParams.order.foodResRequestDtoList;
                vm.items = $sessionStorage.userOrders;
            }
            else {
                vm.items = $sessionStorage.userOrders;
            }
            if (vm.items) {
                angular.forEach(vm.items, function (item) {
                    vm.total += item.foodPrice * item.quantity;
                });
            }

        }();

        function printBillReceipt(printSectionId) {
            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWindow = window.open('', '_blank', 'width=600,height=700');
            popupWindow.document.open();
            popupWindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/style.css">\n' +
                '    <link rel="stylesheet" type="text/css" href="assets/libs/bootstrap/bootstrap.min.css"></head><body onload="window.print()">' + innerContents + '</body></html>');
            popupWindow.document.close();
        }
    }

})();