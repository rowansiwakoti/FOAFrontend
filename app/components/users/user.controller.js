(() => {
    'use strict';

    angular.module('FoodOrderingApp')
        .controller('UserController', UserController);

    UserController.$inject = ['$uibModal', 'UserService'];

    function UserController($uibModal, UserService) {

        var vm = this;
        vm.user = {};
        vm.deleteUser = deleteUser;
        vm.deleteUserConfirm = deleteUserConfirm;
        vm.closeModal = closeModal;
        vm.editUser = editUser;

        vm.$onInit = () => {
            UserService.getUsers()
                .then((success) => {
                    vm.userList = success.data;
                }, (error) => {

                });
        };

        function deleteUser(user) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/users/user-delete-confirm-modal.html',
                controller: 'UserController',
                controllerAs: 'userCtrl',
                size: 'sm'
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }

        function deleteUserConfirm() {
        }

        function closeModal() {
            // $uibModalInstance.close();
        }

        function editUser() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/users/user-edit-modal.html',
                controller: 'UserController',
                controllerAs: 'userCtrl',
                size: 'md'
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }
    }

})();