(function () {
    'use strict';

    beforeEach(module('FoodOrderingApp'));

    describe('Test OrderService', function () {
        var _OrderService, _$sessionStorage, _$httpBackend, _$rootScope, _APP_CONSTANT, food, order, appUrl, _$q;

        beforeEach(inject(function (OrderService, $sessionStorage, $httpBackend, $rootScope, APP_CONSTANT, $q) {
            _$sessionStorage = $sessionStorage;
            _$q = $q;
            _$httpBackend = $httpBackend;
            _$rootScope = $rootScope;
            _APP_CONSTANT = APP_CONSTANT;
            appUrl =_APP_CONSTANT.FOA_APP;

                _$sessionStorage.orderList = [{
                id:1,
                quantity:3
            },{
                id:2,
                quantity:3
            }];
            food = {
                quantity:2
            };
            order = {
                id:1
            };
            
            _OrderService = function () {
              return OrderService;
            };
        }));

        describe('Service elements',function () {
            //confirmOrder function
            it('confirmOrder function',function () {
                var vm = _OrderService();
                vm.getOrder();
            });
            //Check increaseQuantity function
            it('increaseQuantity function', function () {
                var vm = _OrderService();
                vm.increaseQuantity(food);
            });
            //Check decreaseQuantity function
            it('increaseQuantity function', function () {
                var vm = _OrderService();
                vm.decreaseQuantity(food);
            });
            //deleteOrder function
            it('deleteOrder function',function () {
                var vm = _OrderService();
                vm.deleteOrder(order);
            });
            //receiveOrder function
            it('receiveOrder function',function () {
               var vm = _OrderService();
               var id = 1;
               // _$httpBackend.when('PUT',appUrl).respond();
               vm.receiveOrder(id);
            });
            //getOrderList Function as admin
            it('getOrderList Function',function () {
               var vm = _OrderService();
               _$sessionStorage.role = 'admin';
               vm.getOrderList();
            });
            //getOrderList Function as user
            it('getOrderList Function',function () {
                var vm = _OrderService();
                _$sessionStorage.role = 'user';
                vm.getOrderList();
            });
            //confirmOrder function
            it('confirmOrder Function',function () {
                var vm = _OrderService();
                vm.confirmOrder();
            });
            //addOrder function
            it('addOrder function', function () {
                var vm = _OrderService();
                vm.addOrder(order);
            });
        });
    });
})();