(function () {
        'use strict';

        beforeEach(module('FoodOrderingApp'));

        describe('Test Cart Controller', function () {
            var _$controller, _$scope, _$uibModalInstance, _OrderService, _APP_CONSTANT, _order= {
                id: 1,
                name: 'dummyFood',
                restaurantName: 'dummyRestaurant',
                price: 100
            }, _previousOrders=[{},{},{}];

            beforeEach(inject(function (OrderService, APP_CONSTANT, $rootScope, $controller) {
                _$scope = $rootScope.$new();
                _OrderService = OrderService;
                _APP_CONSTANT = APP_CONSTANT;
                _$uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);

                _$controller = function () {
                    return $controller('CartController',{
                        $scope: _$scope,
                        $uibModalInstance: _$uibModalInstance,
                        order: _order,
                        previousOrders: _previousOrders
                    });
                };
           }));

            describe('Testing controller elements',function () {
               //Test $onInit function
               it('$onInit function', function () {
                   var vm = _$controller();
                   vm.$onInit();
               });
               //Testing increaseOrder function for failure(vm.quantity allowed is 1 to 5)
                it('increaseOrder function', function () {
                    var vm = _$controller();
                    vm.quantity = 6;
                    vm.increaseOrder();
                });
                //Testing increaseOrder function for success(vm.quantity allowed is 1 to 5)
                it('increaseOrder function', function () {
                    var vm = _$controller();
                    vm.quantity = 4;
                    vm.increaseOrder();
                    expect(vm.quantity).toBe(5);
                });
                //Testing decreaseOrder function for failure(vm.quantity allowed is 1 to 5)
                it('decreaseOrder function',function () {
                    var vm = _$controller();
                    vm.quantity = 0;
                    vm.decreaseOrder();
                });
                //Testing decreaseOrder function for success(vm.quantity allowed is 1 to 5)
                it('decreaseOrder function',function () {
                    var vm = _$controller();
                    vm.quantity = 5;
                    vm.decreaseOrder();
                    expect(vm.quantity).toBe(4);
                });
                //Testing addToCart function
                it('addToCart function', function () {
                    spyOn(_OrderService,'addOrder').and.callThrough();
                    var vm = _$controller();
                    vm.addToCart();
                    expect(_$uibModalInstance.close).toHaveBeenCalled();
                    expect(_OrderService.addOrder).toHaveBeenCalledWith(_order);
                });
                //Testing closeModal function
                it('closeModal function', function () {
                    var vm = _$controller();
                    vm.closeModal();
                    expect(_$uibModalInstance.dismiss).toHaveBeenCalled();
                });
                //Testing function removeOrder
                it('removeOrder function', function () {
                    spyOn(_OrderService, 'deleteOrder').and.callThrough();
                    var vm = _$controller();
                    vm.removeOrder();
                    expect(_OrderService.deleteOrder).toHaveBeenCalled();
                    expect(vm.false).not.toBeTruthy();
                    expect(vm.quantity).toBe(1);
                });
            });

        });
    }
)();