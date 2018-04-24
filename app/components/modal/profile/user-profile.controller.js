(function () {
    'use strict';

    angular.module('FoodOrderingApp')
        .controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = [
        '$sessionStorage',
        'balance',
        '$uibModalInstance',
        '$uibModal',
        'RestaurantService',
        '$log',
        '$state'
    ];

    function UserProfileController($sessionStorage, balance, $uibModalInstance, $uibModal, RestaurantService, $log, $state) {
        var vm = this;
        vm.name = $sessionStorage.firstName;
        vm.user = $sessionStorage.role;
        vm.balance = balance;

        vm.closeModal = closeModal;
        vm.userLogout = userLogout;
        vm.orderList = orderList;
        vm.favouriteList = favouriteList;

        function orderList() {
            $uibModalInstance.close();
            $state.go('orders.today');
        }

        function closeModal() {
            $uibModalInstance.close();
        }

        function favouriteList(){
            $uibModalInstance.close();
            $state.go('FavouriteList');
        }

        function userLogout() {
            vm.closeModal();
            vm.message = "";
            var modalInstance = $uibModal.open({
                // windowClass: "modal fade in",
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: 'components/modal/logout/logout.html',
                controller: 'LogoutController',
                controllerAs: 'logoutCtrl',
                size: 'sm'
            });
            modalInstance.result.then(function () {
                vm.message = RestaurantService.getAlertMessage();
            }, function () {
                $log.warn('User Logout modal dismissed on ' + new Date());
            });
        }
    }
})();