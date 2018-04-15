(function () {
    'use strict';

    beforeEach(module('FoodOrderingApp'));

    describe('Test Order Modal Controller', function () {
        var _$controller, _$scope, _$uibModalInstance, _$state, _$sessionStorage, _$location, _OrderService, _RestaurantService, _APP_CONSTANT, _$uibModal,_$q, _$rootScope;

        beforeEach(inject(function ($sessionStorage, $state, $uibModal, $location, OrderService, RestaurantService, APP_CONSTANT, $rootScope, $controller, $q) {
            _$scope = $rootScope.$new();
            _$rootScope = $rootScope;
            _$state = $state;
            _$q = $q;
            _$uibModal = $uibModal;
            _$sessionStorage = $sessionStorage;
            _$location = $location;
            _OrderService = OrderService;
            _RestaurantService = RestaurantService;
            _APP_CONSTANT = APP_CONSTANT;
            _$uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);

            _$controller = function () {
                return $controller('OrderModalController',{
                    $scope: _$scope,
                    $uibModalInstance: _$uibModalInstance
                });
            };
        }));

        describe('Controller Components',function () {
           //Test orderOk function
            it('Test orderOk function', function () {
                // spyOn(_$uibModalInstance,'close').and.callThrough();
                var vm = _$controller();
                vm.orderOk();
                expect(_$uibModalInstance.close).toHaveBeenCalled();
            });

            //Test deleteOrder function
            it('Test deleteOrder',function () {
                spyOn(_OrderService, 'deleteOrder').and.callThrough();
                var vm = _$controller();
                var order = {
                    foodName:'dummyFood',
                    foodPrice:150,
                    restaurant:'dummyRestaurant'
                };
                vm.deleteOrder(order);
                expect(_OrderService.deleteOrder).toHaveBeenCalledWith(order);
            });

            //Test increaseOrder function
            it('Test increaseOrder function', function () {
                spyOn(_OrderService,'increaseQuantity').and.callThrough();
                spyOn(_OrderService,'getOrder').and.callThrough();
                var vm = _$controller();
                var food = {
                    quantity:1
                }
                _$sessionStorage.orderList = [{},{}];
                vm.increaseQuantity(food);
                expect(_OrderService.increaseQuantity).toHaveBeenCalled();
                expect(_OrderService.getOrder).toHaveBeenCalled();
            });

            //Test decreaseOrder function
            it('Test decreaseOrder function', function () {
                spyOn(_OrderService,'decreaseQuantity').and.callThrough();
                spyOn(_OrderService,'getOrder').and.callThrough();
                var vm = _$controller();
                var food = {
                    quantity:1
                }
                _$sessionStorage.orderList = [{},{}];
                vm.decreaseQuantity(food);
                expect(_OrderService.decreaseQuantity).toHaveBeenCalled();
                expect(_OrderService.getOrder).toHaveBeenCalled();
            });

            //Test getTotal function
            it('Test getTotal function',function () {
               var vm = _$controller();
               vm.order = [
                   {price:100,quantity:1},
                   {price:200,quantity:2}
               ];
                expect(vm.getTotal()).toBe(500);
            });

            //test orderFood function
            it('test orderFood function',function () {
                var modalInstance = {};
                var deferred = _$q.defer();
                deferred.resolve(modalInstance);
                var mockModalInstance = {result: deferred.promise};
                spyOn(mockModalInstance.result, 'then').and.callThrough();
                spyOn(_$uibModal,'open').and.returnValue(mockModalInstance);
                spyOn(_$rootScope,'$broadcast').and.callThrough();
                var vm = _$controller();
                vm.orderFood();
                // expect(_$rootScope.$broadcast).toHaveBeenCalled();
                expect(_$uibModal.open).toHaveBeenCalled();
                expect(_$uibModalInstance.close).toHaveBeenCalled();
                expect(mockModalInstance.result.then).toHaveBeenCalled();
            });

            //test  continueOrder function
            it('test  continueOrder function', function () {
                spyOn(_$state,'go').and.callThrough();
                var vm = _$controller();
                vm.continueOrder();
                expect(_$uibModalInstance.dismiss).toHaveBeenCalled();
                expect(_$state.go).toHaveBeenCalled();
            });

            //test modalCancel function
            it('test modalCancel function', function () {
                var vm = _$controller();
                vm.modalCancel();
                expect(_$uibModalInstance.dismiss).toHaveBeenCalled();
            });
        });
    });
})();