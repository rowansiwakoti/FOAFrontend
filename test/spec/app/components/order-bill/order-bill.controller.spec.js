(function () {
    "use strict";
    describe('OrderBillController', function () {

        var _$scope, _$sessionStorage, _$state, _$stateParams, _$controller;

        beforeEach(module('FoodOrderingApp'));

        beforeEach(inject(function ($sessionStorage, $state, $stateParams, $rootScope, $controller) {
            _$scope = $rootScope.$new();
            _$sessionStorage = $sessionStorage;
            _$state = $state;
            _$stateParams = $stateParams;

            _$controller = $controller('OrderBillController', {
                $scope: _$scope,
                $sessionStorage: _$sessionStorage,
                $state: _$state
            });

        }));

        it('should call $onInit function. when emailId is undefined', function () {
            _$sessionStorage.emailId = '';
            spyOn(_$state, 'go');
            expect(_$state.go).not.toHaveBeenCalled();
            _$state.go();
            expect(_$state.go).toHaveBeenCalled();
        });

        it('should call $onInit function. when a user\'s order is received by an admin', function () {
            _$sessionStorage.userOrders = [{}];
            spyOn(_$state, 'go');
            expect(_$state.go).not.toHaveBeenCalled();
            _$state.go();
            expect(_$state.go).toHaveBeenCalled();
        });

    });
})();