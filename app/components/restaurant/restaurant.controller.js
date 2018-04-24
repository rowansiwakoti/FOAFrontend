(() => {
    'use strict';
    angular.module('FoodOrderingApp')
        .controller('RestaurantController', RestaurantController);
    RestaurantController.$inject = [
        '$sessionStorage',
        '$localStorage',
        '$state',
        '$stateParams',
        '$uibModal',
        '$log',
        '$scope',
        'FoodService',
        'RestaurantService',
        'OrderService',
        'CompareFoodService',
        '$timeout',
        'ReviewService'
    ];

    function RestaurantController($sessionStorage, $localStorage, $state, $stateParams, $uibModal, $log, $scope, FoodService, RestaurantService, OrderService, CompareFoodService, $timeout, ReviewService) {

        var vm = this;
        vm.foodItems = [];
        vm.restaurant = '';
        vm.foods = [];
        vm.order = OrderService.getOrder();
        vm.message = '';
        vm.role = $sessionStorage.role;
        vm.reviewStatus = false;

        var userId = $sessionStorage.userId;

        $scope.$on("infoMsg", (data) => {
            vm.infoMsg = RestaurantService.getAlertMessage();
        });


        //functions
        vm.addFood = addFood;
        vm.editFood = editFood;
        vm.deleteFood = deleteFood;
        vm.addOrder = addOrder;
        vm.deleteOrder = deleteOrder;
        vm.confirmOrder = confirmOrder;
        vm.restaurantStatus = restaurantStatus;
        vm.deleteFoodToAdd = deleteFoodToAdd;
        vm.confirmAdd = confirmAdd;
        vm.getFoods = getFoods;
        vm.compareFood = compareFood;
        vm.ifDisabled = ifDisabled;
        vm.leaveReview = leaveReview;

        vm.showFoods = false;

        init();

        function init() {
            if (angular.isUndefined($sessionStorage.emailId) || $sessionStorage.emailId === '') {
                $state.go('login');
            }

            if ($sessionStorage.addFoods) {
                vm.addFoods = $sessionStorage.addFoods;
            }
            else {
                vm.addFoods = [];
            }

            $scope.$on('updateFoodList', (event, data) => {
                vm.foods = data;
            });

            if ($stateParams.restaurant) {
                $sessionStorage.restaurant = $stateParams.restaurant;
            }
            vm.restaurant = $sessionStorage.restaurant;
            if ($sessionStorage.restaurant) {
                vm.status = $sessionStorage.restaurant.active;
            }

            ReviewService.getUserReviewForRestaurant(userId, vm.restaurant.id)
                .then((success) => {
                    if (success.data.restaurantName === vm.restaurant.name) {
                        vm.reviewStatus = true;
                        console.log(vm.reviewStatus);
                    }
                })
                .catch((error) => {
                    console.log(error.status);
                })
        }


        //Getting Foods for the current Restaurant
        vm.currentPage = 0;
        vm.totalFoods = 0;

        vm.getFoods();

        function getFoods() {
            if (vm.restaurant) {
                FoodService.getFoodList(vm.restaurant.id, vm.currentPage - 1)
                    .then(
                        (success) => {
                            vm.foods = success.data.responseData;
                            vm.totalFoods = success.data.pageModel.count;
                            // $timeout(() => {
                            vm.showFoods = true;
                            // }, 1000);
                        },
                        (error) => {
                            vm.showFoods = true;
                            $log.error('Error occurred while fetching foods from the restaurant ', error.status);
                        }
                    );
            }
        }

        function addFood() {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                // backdrop: false,
                templateUrl: 'components/modal/food/food.html',
                controller: 'FoodController',
                controllerAs: 'foodCtrl',
                resolve: {
                    food: () => null // equivalent to: => { return expression; }
                    ,
                    foods: () => vm.addFoods // equivalent to: => { return expression; }
                }
            });
            modalInstance.result.then((food) => {

                food.restaurantId = vm.restaurant.id;
                food.restaurantName = vm.restaurant.name;
                vm.addFoods.push(food);
                $sessionStorage.addFoods = vm.addFoods;
                $log.info('Add food modal closed on ' + new Date());

            }, () => {
                $log.warn('Add food modal dismissed on ' + new Date());
            });
        }


        function editFood(food) {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                // backdrop: false,
                templateUrl: 'components/modal/food/food.html',
                controller: 'FoodController',
                controllerAs: 'foodCtrl',
                resolve: {
                    food: () => food // equivalent to: => { return expression; }
                    ,
                    foods: () => null // equivalent to: => { return expression; }
                }
            });
            modalInstance.result.then((food) => {
                edit(food);
                vm.message = FoodService.getAlertMessage();
            }, () => {
                $log.warn('Edit food modal dismissed on ' + new Date());
            });
        }

        function edit(food) {
            var pos;
            angular.forEach(vm.foods, (item, index) => {
                if (item.id === food.id) {
                    pos = index;
                }
            });
            vm.foods[pos] = food;
        }

        function deleteFood(food) {
            vm.message = '';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                // backdrop: false,
                templateUrl: 'components/modal/food/food-delete-confirm-modal.html',
                controller: 'FoodController',
                controllerAs: 'foodCtrl',
                size: 'sm',
                resolve: {
                    food: () => food // equivalent to: => { return expression; }
                    ,
                    foods: () => null // equivalent to: => { return expression; }
                }
            });
            modalInstance.result.then((food) => {
                deleteFood(food);
                $log.info('Delete food modal closed on ' + new Date());
                vm.message = FoodService.getAlertMessage();
            }, () => {
                $log.warn('Delete food modal dismissed on ' + new Date());
            });

            function deleteFood(food) {
                var pos;
                angular.forEach(vm.foods, (item, index) => {
                    if (item.id === food.id) {
                        pos = index;
                    }
                })
                vm.foods.splice(pos, 1);
            }
        }

        function addOrder(food, restaurantName) {
            RestaurantService.setAlertMessage('');
            var order = {
                id: food.id,
                name: food.name,
                restaurantName: restaurantName,
                price: food.price
            };

            var previousOrders = OrderService.getOrder();

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                // backdrop: false,
                templateUrl: 'components/modal/cart/cart.html',
                controller: 'CartController as cartCtrl',
                size: 'md',
                resolve: {
                    order: () => order // equivalent to: => { return expression; }
                    ,
                    previousOrders: () => previousOrders // equivalent to: => { return expression; }
                }
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }

        function deleteOrder(food) {
            OrderService.deleteOrder(food);
            vm.order = OrderService.getOrder();
        }

        function confirmOrder() {
            $state.go('order');
        }

        function restaurantStatus(id, status) {
            if (status) {
                RestaurantService.activateRestaurant(id)
                    .then((success) => {
                        $log.info(success.data);
                    }, (error) => {
                        $log.error('Error occurred while activating the restaurant ', error.status);
                    });
            }
            else {
                RestaurantService.deactivateRestaurant(id)
                    .then((success) => {
                        $log.info(success.data);
                    }, (error) => {
                        $log.error('Error occurred while deactivating the restaurant ', error.status);
                    });
            }
            if (angular.isDefined($sessionStorage.restaurant)) {
                $sessionStorage.restaurant.active = status;
            }
        }

        function deleteFoodToAdd(food) {
            var pos;
            angular.forEach(vm.addFoods, (item, index) => {
                if (item.name === food.name && item.restaurantId === food.restaurantId) {
                    pos = index;
                }
            });
            vm.addFoods.splice(pos, 1);
            $sessionStorage.addFoods = vm.addFoods;
        }

        function confirmAdd() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                // backdrop: false,
                templateUrl: 'components/modal/food/food-add-confirm-modal.html',
                controller: 'FoodController  as foodCtrl',
                size: 'sm',
                resolve: {
                    foods: () => vm.addFoods // equivalent to: => { return expression; }
                    ,
                    food: () => null // equivalent to: => { return expression; }
                }
            });
            modalInstance.result.then(
                (foods) => {
                    angular.forEach(foods, (food) => {
                        if (vm.restaurant.id === food.restaurantId) {
                            if (vm.foods.length < 10) {
                                vm.foods.push(food);
                            }
                        }
                    });
                    vm.addFoods = [];
                    $sessionStorage.addFoods = vm.addFoods;
                    $log.info('Confirm add modal closed on ' + new Date());
                },
                () => {
                    $log.warn('Confirm add modal dismissed on ' + new Date());
                }
            );
        }

        function compareFood(food) {
            var foodDetail = {
                id: food.id,
                name: food.name,
                restaurantName: vm.restaurant.name,
                price: food.price,
                quantity: 1
            }
            CompareFoodService.addToCompareList(foodDetail);
        }


        /**
         * Disable the Compare Button if the food is already in compare list
         ***/
        function ifDisabled(food) {
            var flag = false;
            var comparedFoods = CompareFoodService.getCompareList();
            angular.forEach(comparedFoods, (eachItem) => {
                if (eachItem.id === food.id) {
                    flag = true;
                }
            });
            return flag;
        }

        function leaveReview() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modal/review/review.html',
                controller: 'ReviewController as reviewCtrl',
                size: 'md',
                resolve: {
                    RestaurantId: () => vm.restaurant.id // equivalent to: => { return expression; }
                }
            });
            modalInstance.result.then(angular.noop, angular.noop);
        }
    }

})();