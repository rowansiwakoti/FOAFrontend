(function () {
    "use strict";

    describe("controller test", function () {

        beforeEach(module("FoodOrderingApp"));

        describe("header controller", function () {

            var _$scope, _$sessionStorage, _$uibModal, _$interval, _APP_CONSTANT, _OrderService, _$controller, _$rootScope, _$q;

            beforeEach(inject(function ($sessionStorage, $uibModal, $rootScope, $interval, APP_CONSTANT, OrderService, $controller, $q) {
                _$rootScope = $rootScope;
                _$scope = $rootScope.$new();
                _$q = $q;
                _$sessionStorage = $sessionStorage;
                _$interval = $interval;
                _APP_CONSTANT = APP_CONSTANT;
                _OrderService = OrderService;
                _$uibModal = $uibModal;

                _$controller = function () {
                    return $controller('HeaderController as headerCtrl',{
                        $scope : _$scope,
                        $sessionStorage: _$sessionStorage
                    });
                };
            }));

            describe('Checking Header controller elements', function () {

                //Testing $interval for the function as admin
                it('Test $interval function', function () {
                    var deferred = _$q.defer();
                    spyOn(_OrderService,'getOrderList').and.returnValue(deferred.promise);
                    _$sessionStorage.role= 'admin';
                    var vm = _$controller();
                    _$interval.flush(30000);
                    deferred.resolve('sdfsdf');
                    _$scope.$apply();
                    expect(_OrderService.getOrderList).toHaveBeenCalled();
                });

                //Testing $interval for the function as user
                it('Test $interval function', function () {
                    var deferred = _$q.defer();
                    spyOn(_OrderService,'getOrderList').and.returnValue(deferred.promise);
                    _$sessionStorage.role= 'user';
                    var vm = _$controller();
                    _$interval.flush(30000);
                    deferred.resolve('sdfsdf');
                    _$scope.$apply();
                    expect(_OrderService.getOrderList).toHaveBeenCalled();
                });

                //Testing $interval for the function error
                it('Test $interval function', function () {
                    var deferred = _$q.defer();
                    spyOn(_OrderService,'getOrderList').and.returnValue(deferred.promise);
                    _$sessionStorage.role= 'admin';
                    var vm = _$controller();
                    _$interval.flush(30000);
                    deferred.reject('sdfsdf');
                    _$scope.$apply();
                    expect(_OrderService.getOrderList).toHaveBeenCalled();
                });

                //Checking onInit function
                it('test onInit function successful', function () {
                    _$sessionStorage.role = 'admin';
                    _$sessionStorage.balance = 1200;
                    var orderList = [];
                    _$sessionStorage.orderList = orderList;
                    var vm = _$controller();
                    // _$sessionStorage.setItem('role','admin');
                    vm.$onInit();
                    expect(vm.role).toBe('admin');
                    expect(vm.orderList).toBe(orderList);
                });

                //Checking appName function
                it('Test function appName',function () {
                    var vm = _$controller();
                    spyOn(vm,'appName').and.callThrough();
                    vm.appName();
                    expect(vm.appName).toHaveBeenCalled();
                });

                //Checking the openCart function
                it('Check open cart function',function () {
                    spyOn(_$uibModal,'open').and.callThrough();
                    var vm = _$controller();
                    vm.openCart();
                    expect(_$uibModal.open).toHaveBeenCalled();
                });

                //Checking Init Order List function success case
                it('Check initOrderList for success', function () {
                    var deferred = _$q.defer();
                    spyOn(_OrderService,'getOrderList').and.returnValue(deferred.promise);
                    _$sessionStorage.role = 'admin';
                    var vm = _$controller();
                    vm.initOrderList();
                    deferred.resolve('sdfsdf');
                    _$scope.$apply();
                    expect(_OrderService.getOrderList).toHaveBeenCalled();
                });

                //Checking Init Order List function success case
                it('Check initOrderList for success', function () {
                    var deferred = _$q.defer();
                    spyOn(_OrderService,'getOrderList').and.returnValue(deferred.promise);
                    _$sessionStorage.role = 'user';
                    var vm = _$controller();
                    vm.initOrderList();
                    deferred.resolve('sdfsdf');
                    _$scope.$apply();
                    expect(_OrderService.getOrderList).toHaveBeenCalled();
                });

                //Checking Init Order List function success case
                it('Check initOrderList for failure', function () {
                    var deferred = _$q.defer();
                    spyOn(_OrderService,'getOrderList').and.returnValue(deferred.promise);
                    _$sessionStorage.role = 'admin';
                    var vm = _$controller();
                    vm.initOrderList();
                    deferred.reject('sdfsdf');
                    _$scope.$apply();
                    expect(_OrderService.getOrderList).toHaveBeenCalled();
                });

                //Checking the open notification function
                it('Check openNotification function', function () {
                    spyOn(_$uibModal,'open').and.callThrough();
                    var vm = _$controller();
                    vm.openNotification();
                    expect(_$uibModal.open).toHaveBeenCalled();
                });

                //Checking open wallet function
                it('Check openWallet function', function () {
                    spyOn(_$uibModal,'open').and.callThrough();
                    var vm = _$controller();
                    vm.openWallet();
                    expect(_$uibModal.open).toHaveBeenCalled();
                });

                //Checking updateOrder event
                it('Testing upateOrder event', function () {
                    var vm = _$controller();
                    _$rootScope.$broadcast('updateOrder', '');
                    expect(vm.orders).toBe('');
                });

                //Checking updateOrderAfterConfirm event
                it('Testing updateOrderAfterConfirm event', function () {
                    var vm  =_$controller();
                    _$rootScope.$broadcast('updateOrdersAfterConfirm', '');
                    expect(vm.order).toBe('');
                });

                //Checking instantUpdateRole event
                it('instantUpdateRole', function () {
                    var vm = _$controller();
                    _$rootScope.$broadcast('instantUpdateRole', 'admin');
                    _$sessionStorage.role = 'admin';
                    expect(vm.role).toBe('admin');
                });

                //Checking instantUpdateBalance event
                it('Test instantUpdateBalance event', function () {
                    var vm = _$controller();
                    _$rootScope.$broadcast('instantUpdateBalance', 1200);
                    expect(vm.balance).toBe(1200);
                });

                //Checking clearRole event
                it('Test clearRole event', function () {
                    var vm = _$controller();
                    _$rootScope.$broadcast('clearRole','clear');
                    expect(vm.role).toBe('clear');
                });

                //Testing updateOrders event
                it('Test updateOrders event', function () {
                    var vm = _$controller();
                    _$rootScope.$broadcast('updateOrders', '');
                    expect(vm.order).toBe('');
                });
            });
        });

    });
})();