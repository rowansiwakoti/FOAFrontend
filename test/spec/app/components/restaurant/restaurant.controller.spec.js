(function () {
    "use strict";

    describe('Restaurant Controller', function () {

        beforeEach(module('FoodOrderingApp'));

        var _$q, _$controller, _$scope, _$sessionStorage, _$state, _$stateParams, _$uibModal, _$log, _mockFoodService,
            _mockRestaurantService, _mockOrderService;

        beforeEach(inject(function ($q, $rootScope, $controller, $sessionStorage, $state, $stateParams, $uibModal, $log, FoodService, RestaurantService, OrderService) {

            _$scope = $rootScope.$new();
            _$q = $q;
            _$state = $state;
            _$uibModal = $uibModal;
            _mockFoodService = FoodService;
            _mockRestaurantService = RestaurantService;
            _mockOrderService = OrderService;
            _$sessionStorage = $sessionStorage;

            _$controller = $controller('RestaurantController', {
                $scope: _$scope,
                $q: _$q
            });
        }));

        it('should test $on event', function () {
            _$scope.$broadcast('infoMsg', {'message': 'Hello World'});
            _$scope.$digest();
        });

        it('should call $onInit function', function () {
           
        });

        it('should call getFoodList function', function () {

            spyOn(_mockFoodService, 'getFoodList').and.callThrough();
            expect(_mockFoodService.getFoodList).not.toHaveBeenCalled();
            _$controller.getFoods();
            // expect(_mockFoodService.getFoodList).toHaveBeenCalled();

        });

        it('should call addFood function', function () {

            var modalResult = {};
            var mockModalInstance = {result: _$q.resolve(modalResult)};
            spyOn(mockModalInstance.result, 'then').and.callThrough();
            spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
            _$controller.addFood();
            // _$scope.$digest();
            expect(_$uibModal.open).toHaveBeenCalled();
            expect(mockModalInstance.result.then).toHaveBeenCalled();

        });

        it('should call editFood function', function () {
            var modalResult = {};
            var mockModalInstance = {result: _$q.resolve(modalResult)};
            spyOn(mockModalInstance.result, 'then').and.callThrough();
            spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
            var fakeData = {};
            _$controller.editFood(fakeData);
            expect(_$uibModal.open).toHaveBeenCalled();
            expect(mockModalInstance.result.then).toHaveBeenCalled();
        });

        it('should call deleteFood function', function () {
            var modalResult = {};
            var mockModalInstance = {result: _$q.resolve(modalResult)};
            spyOn(mockModalInstance.result, 'then').and.callThrough();
            spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
            var fakeData = {};
            _$controller.deleteFood(fakeData);
            expect(_$uibModal.open).toHaveBeenCalled();
            expect(mockModalInstance.result.then).toHaveBeenCalled();
        });

        it('should call addOrder function', function () {
            var modalResult = {};
            var mockModalInstance = {result: _$q.resolve(modalResult)};
            spyOn(mockModalInstance.result, 'then').and.callThrough();
            spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
            var mockFood = {};
            _$controller.addOrder(mockFood);
            expect(_$uibModal.open).toHaveBeenCalled();
            expect(mockModalInstance.result.then).toHaveBeenCalled();
        });

        it('should call deleteOrder function', function () {
            spyOn(_mockOrderService, 'deleteOrder').and.callThrough();
            var mockFood = {};
            _$controller.deleteOrder(mockFood);
            expect(_mockOrderService.deleteOrder).toHaveBeenCalled();

        });

        it('should call confirmOrder function and move to the order page', function () {
            spyOn(_$state, 'go');
            _$controller.confirmOrder();
            expect(_$state.go).toHaveBeenCalled();
        });

        it('should call restaurantStatus function and when the status is true', function () {
            var mockId = 1;
            var mockStatus = true;
            spyOn(_mockRestaurantService, 'activateRestaurant').and.callThrough();
            _$controller.restaurantStatus(mockId, mockStatus);
            _$scope.$apply();
            expect(_mockRestaurantService.activateRestaurant).toHaveBeenCalled();
        });

        it('should call restaurantStatus function and when the status is false', function () {
            var mockId = 1;
            var mockStatus = false;
            spyOn(_mockRestaurantService, 'deactivateRestaurant').and.callThrough();
            _$controller.restaurantStatus(mockId, mockStatus);
            _$scope.$apply();
            expect(_mockRestaurantService.deactivateRestaurant).toHaveBeenCalled();
        });

        it('should call confirmAdd function', function () {
            var modalResult = {};
            var mockModalInstance = {result: _$q.resolve(modalResult)};
            spyOn(mockModalInstance.result, 'then').and.callThrough();
            spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
            _$controller.confirmAdd();
            expect(_$uibModal.open).toHaveBeenCalled();
            expect(mockModalInstance.result.then).toHaveBeenCalled();
        });

    });

})();
