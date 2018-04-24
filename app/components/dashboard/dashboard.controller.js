(function () {
    'use strict';

    angular.module('FoodOrderingApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
        '$state',
        '$uibModal',
        '$sessionStorage',
        '$log',
        'APP_CONSTANT',
        'RestaurantService',
        'FavouriteRestaurantService',
        '$rootScope'
    ];

    function DashboardController($state, $uibModal, $sessionStorage, $log, APP_CONSTANT, RestaurantService, FavouriteRestaurantService, $rootScope) {

        var vm = this;

        vm.noFoodMsg = APP_CONSTANT.NO_FOOD_MSG;
        vm.restaurants = [];
        vm.message = '';
        vm.firstName = $sessionStorage.firstName;
        vm.role = $sessionStorage.role;
        vm.totalRestaurants = 0;


        //functions
        vm.userLogout = userLogout;
        vm.addRestaurant = addRestaurant;
        vm.deleteRestaurant = deleteRestaurant;
        vm.editRestaurant = editRestaurant;
        vm.placeOrder = placeOrder;
        vm.getRestaurants = getRestaurants;
        vm.getAllUsers = getAllUsers;
        vm.gotoRestaurant = gotoRestaurant;
        vm.addToFavourite = addToFavourite;


        vm.$onInit = function () {
            if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }
            if ($sessionStorage.currentPage) {
                vm.currentPage = $sessionStorage.currentPage;
                getRestaurants();
            }
            else {
                vm.currentPage = 1;
                vm.getRestaurants();
            }
            if ($sessionStorage.loggedIn !== 1) {
                $sessionStorage.loggedIn = 1;
                $rootScope.$broadcast('loggedIn', {});
            }
        };


        function getRestaurants() {

            $sessionStorage.currentPage = vm.currentPage;

            RestaurantService.getRestaurantList(vm.currentPage - 1).then(
                function (answer) {
                    vm.currentPage = $sessionStorage.currentPage;
                    vm.restaurants = answer.data.responseData;
                    vm.totalRestaurants = answer.data.pageModel.count;
                },
                function (error) {
                    $log.error('Error occurred while fetching restaurants!', error.status);
                }
            );
        }

        function userLogout() {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
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

        function addRestaurant() {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modal/restaurant/restaurant.html',
                controller: 'RestaurantModalController',
                controllerAs: 'restaurantModalCtrl',
                resolve: {
                    Restaurant: function () {
                        return null;
                    }
                }
            });
            modalInstance.result.then(function (restaurant) {
                vm.message = RestaurantService.getAlertMessage();
                add(restaurant);
            }, function () {
                $log.warn('Add restaurant modal dismissed on ' + new Date());
            });
        }

        function add(restaurant) {
            if (vm.restaurants.length < 6) {
                vm.restaurants.push(restaurant);
            }
            else if (vm.restaurants.length >= 6) {
                vm.getRestaurants();
            }
        }

        function deleteRestaurant(restaurant) {

            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modal/restaurant/restaurant-delete-confirm-modal.html',
                controller: 'RestaurantModalController',
                controllerAs: 'restaurantModalCtrl',
                size: 'sm',
                resolve: {
                    Restaurant: function () {
                        return restaurant;
                    }
                }
            });

            modalInstance.result.then(function () {
                vm.message = RestaurantService.getAlertMessage();
                deleteRest(restaurant);
            }, function () {
                $log.warn('Delete restaurant modal dismissed on ' + new Date());
            });
        }

        function deleteRest(restaurant) {
            var pos;
            angular.forEach(vm.restaurants, function (rest, index) {
                if (rest.id === restaurant.id) {
                    pos = index;
                }
            });
            vm.restaurants.splice(pos, 1);

            if (vm.restaurants.length <= 0) {
                vm.currentPage -= 1;
                vm.getRestaurants();
            }
        }

        function editRestaurant(restaurant) {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modal/restaurant/restaurant.html',
                controller: 'RestaurantModalController',
                controllerAs: 'restaurantModalCtrl',
                resolve: {
                    Restaurant: function () {
                        return restaurant;
                    }
                }
            });

            modalInstance.result.then(function (restaurant) {
                vm.message = RestaurantService.getAlertMessage();
                edit(restaurant);
            }, function () {
                $log.warn('Edit restaurant modal dismissed on ' + new Date());
            });
        }

        function edit(restaurant) {
            var pos;
            angular.forEach(vm.restaurants, function (rest, index) {
                if (rest.id === restaurant.id) {
                    pos = index;
                }
            })
            vm.restaurants[pos] = restaurant;
        }

        function getAllUsers() {
            $state.go('users');
        }

        function placeOrder() {
            $state.go('order');
        }

        function gotoRestaurant(restaurant) {
            $state.go('restaurant', {
                restaurant: restaurant
            });
        }

        function addToFavourite(restId){
            let userId = $sessionStorage.userId;
            FavouriteRestaurantService.addToFavourite(userId, restId)
                .then(function(success){
                  if((success.data.message).includes('added')){
                      console.log('added to favorite list')
                      vm.fav = 1;
                  }
                  else{
                      vm.fav = 0;
                      console.log('removed from favorite list');
                  }
                })
                .catch(function(error){

                });

        }
    }

})();