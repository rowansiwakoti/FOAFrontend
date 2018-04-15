(function () {
    'use strict';

    beforeEach(module('FoodOrderingApp'));

    describe('Testing Dashboard Controller', function () {
        var _$controller, _$scope, _$sessionStorage, _APP_CONSTANT, _RestaurantService, _$uibModal, _$q, _$log, _$modalInstance, _$mockModalInstance, _$state;

        beforeEach(inject(function ($state, $uibModal, $sessionStorage, $log, APP_CONSTANT, RestaurantService, $rootScope, $controller, $q) {
            _$scope = $rootScope.$new();
            _$sessionStorage = $sessionStorage;
            _RestaurantService = RestaurantService;
            _$uibModal = $uibModal;
            _$q = $q;
            _$log = $log;
            _$state = $state;

            _$modalInstance = {};
            var deferred = _$q.defer();
            deferred.resolve(_$modalInstance);
            deferred.reject(_$modalInstance);
            _$mockModalInstance = {result: deferred.promise}

            _$controller = function () {
                return $controller('DashboardController as dashboardCtrl', {
                    $scope: _$scope,
                    RestaurantService: _RestaurantService,
                });
            };
        }));

        describe('Checking Controller elements', function () {

            //Checking the on init function
            it('Checking on init function', function () {
                spyOn(_RestaurantService, 'getRestaurantList').and.returnValue(_$q.reject('failure'));
                spyOn(_$log,'info').and.callThrough();
                var vm = _$controller();
                expect(vm.currentPage).toEqual(1);
                vm.$onInit();
                _$scope.$apply();
                expect(_RestaurantService.getRestaurantList).toHaveBeenCalled();
                expect(_$log.info).toHaveBeenCalledWith('failure');
            });


            //Checking the add restaurant function for success
            it('Checking add restaurant function', function () {
               var modalInstance = {};
               var deferred = _$q.defer();
               deferred.resolve(modalInstance);
               var mockModalInstance = {result: deferred.promise};
               spyOn(mockModalInstance.result, 'then').and.callThrough();
                spyOn(_$uibModal,'open').and.returnValue(mockModalInstance);
               var vm  = _$controller();
               vm.addRestaurant();
               _$scope.$apply();
               expect(_$uibModal.open).toHaveBeenCalled();
               expect(mockModalInstance.result.then).toHaveBeenCalled();
            });

            //Checking the add restaurant function for failure
            it('Checking add restaurant function', function () {
                var modalInstance = {};
                var deferred = _$q.defer();
                deferred.reject(modalInstance);
                var mockModalInstance = {result: deferred.promise};
                // spyOn(mockModalInstance.result, 'catch').and.callThrough();
                spyOn(_$uibModal,'open').and.returnValue(mockModalInstance);
                var vm  = _$controller();
                vm.addRestaurant();
                _$scope.$apply();
                expect(_$uibModal.open).toHaveBeenCalled();
                // expect(mockModalInstance.result.catch).toHaveBeenCalled();
            });

            //Checking user log out function for success
            it('Checking user logout function', function () {
               var modalInstance = {};
               var deferred = _$q.defer();
               deferred.resolve(modalInstance);
               var mockModalInstance = {result: deferred.promise};
                spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
               var vm = _$controller();
               vm.userLogout();
               _$scope.$apply();
               expect(_$uibModal.open).toHaveBeenCalled();
            });

            //Checking user log out function for failure
            it('Checking user logout function', function () {
                var modalInstance = {};
                var deferred = _$q.defer();
                deferred.reject(modalInstance);
                var mockModalInstance = {result: deferred.promise};
                spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
                var vm = _$controller();
                vm.userLogout();
                _$scope.$apply();
                expect(_$uibModal.open).toHaveBeenCalled();
            });

            //Checking delete restaurant function for success
            it('Checking delete restaurant function', function () {
                var modalResult = 1;
                var deferred = _$q.defer();
                deferred.resolve(modalResult);
                var mockModalInstance = { result: deferred.promise };
                spyOn(mockModalInstance.result, 'then').and.callThrough();
                spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
                var vm = _$controller();
                vm.restaurants = [{},{}];
                vm.deleteRestaurant();
                _$scope.$apply();
                expect(_$uibModal.open).toHaveBeenCalled();
            });

            //Checking delete restaurant function for failure
            it('Checking delete restaurant function', function () {
                var modalResult = {};
                var deferred = _$q.defer();
                deferred.reject(modalResult);
                var mockModalInstance = { result: deferred.promise };
                // spyOn(mockModalInstance.result, 'catch').and.callThrough();
                spyOn(_$uibModal, 'open').and.returnValue(mockModalInstance);
                var vm = _$controller();
                vm.deleteRestaurant();
                _$scope.$apply();
                expect(_$uibModal.open).toHaveBeenCalled();
                // expect(mockModalInstance.result.catch).toHaveBeenCalled();
            });

            //Checking edit restaurant function for success
            it('Checking edit restaurant function', function () {
                var modalInstance = {};
                var deferred = _$q.defer();
                deferred.resolve(modalInstance);
                var mockModalInstance = { result: deferred.promise};
                spyOn(_$uibModal,'open').and.returnValue(mockModalInstance);
                spyOn(mockModalInstance.result, 'then').and.callThrough();
                var vm = _$controller();
                vm.restaurants = [{},{}];
                vm.editRestaurant();
                _$scope.$apply();
                expect(_$uibModal.open).toHaveBeenCalled();
            });

            //Checking edit restaurant function for failure
            it('Checking edit restaurant function', function () {
                var modalInstance = {};
                var deferred = _$q.defer();
                deferred.reject(modalInstance);
                var mockModalInstance = { result: deferred.promise};
                spyOn(_$uibModal,'open').and.returnValue(mockModalInstance);
                spyOn(mockModalInstance.result, 'then').and.callThrough();
                var vm = _$controller();
                vm.editRestaurant();
                _$scope.$apply();
                expect(_$uibModal.open).toHaveBeenCalled();
            });

            //Checking function placeOrder
            it('Checking placeOrder function',function () {
                spyOn(_$state,'go').and.callThrough();
                var vm = _$controller();
                vm.placeOrder();
                expect(_$state.go).toHaveBeenCalled();
            });

            //Checking the on init function
            it('Checking on init function', function () {
                spyOn(_RestaurantService, 'getRestaurantList').and.returnValue(_$q.resolve({
                    data:{
                        responseData:[{},{}],
                        pageModel:{
                            count:6
                        }
                    }
                }));
                var vm = _$controller();
                vm.$onInit();
                _$scope.$apply();
                expect(_RestaurantService.getRestaurantList).toHaveBeenCalled();
                expect(vm.restaurants).toEqual([{},{}]);
                expect(vm.totalRestaurants).toBe(6);
            });

        });
    });
})();