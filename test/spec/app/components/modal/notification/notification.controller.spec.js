(function () {
    'use strict';

    beforeEach(module('FoodOrderingApp'));

    describe('Testing NotificationController', function () {
        var _$scope, _$controller, _$state, _$sessionStorage, _$uibModalInstance, _orderList, _UserService, _order, _$q,_users;

        beforeEach(inject(function ($state, $sessionStorage, UserService, $rootScope, $controller,$q) {
            _$scope = $rootScope.$new();
            _$q = $q;
            _$sessionStorage = $sessionStorage;
            _UserService = UserService;
            _$state = $state;
            _$uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);
            _orderList = [{},{},{}];
            _order = {
                id:1,
                userId:1,
                foodResList:[
                    {
                        id:'dummyFood',
                        price:100,
                        quantity:1,
                        restaurant:'dummyRestaurant'
                    }
                ]
            };
            _users = [{
                userId:1
            },{
                userId:2
            },{
                userId:3
            }];

            _$controller = function () {
              return $controller('NotificationController',{
                  $scope: _$scope,
                  $uibModalInstance: _$uibModalInstance,
                  orderList: _orderList
              });
            };
        }));

        describe('Test controller elements', function () {
            //Test $onInit function for success
            it('$onInit function', function () {
               spyOn(_UserService, 'getUsers').and.returnValue(_$q.resolve(_users));
                var vm = _$controller();
                vm.$onInit();
                _$scope.$apply();
                expect(_UserService.getUsers).toHaveBeenCalled();
            });
            //Test $onInit function for failure
            it('$onInit function', function () {
                spyOn(_UserService, 'getUsers').and.returnValue(_$q.reject({}));
                var vm = _$controller();
                vm.$onInit();
                _$scope.$apply();
                expect(_UserService.getUsers).toHaveBeenCalled();
            });
            //Test closeModal function
            it('closeModal function',function () {
               var vm = _$controller();
               vm.closeModal();
               expect(_$uibModalInstance.close).toHaveBeenCalled();
            });
            // Test gotoOrder function
            it('gotoOrder function', function () {
                spyOn(_$state,'go').and.callThrough();
                var vm = _$controller();
                vm.gotoOrder();
                expect(_$state.go).toHaveBeenCalled();
                expect(_$uibModalInstance.close).toHaveBeenCalled();
            });
            // Test gotoOrder function
            it('orderBill function', function () {
                spyOn(_$state,'go').and.callThrough();
                var vm = _$controller();
                vm.orderBill();
                expect(_$state.go).toHaveBeenCalled();
                expect(_$uibModalInstance.close).toHaveBeenCalled();
            });
            // Test gotoOrder function
            it('gotoOrder function', function () {
                var vm = _$controller();
                vm.individualOrder(_order);
                expect(_$sessionStorage.individualOrder).toBe(_order);
                expect(_$uibModalInstance.close).toHaveBeenCalled();
            });
        });
    });
})();