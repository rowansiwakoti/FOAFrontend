(function () {
    "use strict";

    describe('OrderList Controller', function () {

        beforeEach(module('FoodOrderingApp'));

        var _$scope, _$controller, _$sessionStorage, _mockOrderService, _$state, _mockUserService;

        beforeEach(inject(function ($rootScope, $controller, $sessionStorage, OrderService, $state, UserService) {

            _$scope = $rootScope.$new();
            _$state = $state;

            _$controller = $controller('OrderListController', {
                $scope: _$scope
            });
        }));

        it('should call  $onInit functions', function () {

            spyOn(_$state, 'go').and.callThrough();
            _$controller.$onInit();
            expect(_$state.go).toHaveBeenCalled();

        });

    });

})();
