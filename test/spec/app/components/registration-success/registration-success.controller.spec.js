(function () {
    "use strict";
    describe('RegistrationSuccessController', function () {

        beforeEach(module('FoodOrderingApp'));

        var _$scope, _$state, _$controller;

        beforeEach(inject(function ($rootScope, $state, $controller) {
            _$scope = $rootScope.$new();
            _$state = $state;
            _$controller = $controller('RegistrationSuccessController', {
                $scope: _$scope
            });
        }));

        it('should call gotoLogin function and move to the login page', function () {
            spyOn(_$state, 'go');
            _$controller.gotoLogin();
            expect(_$state.go).toHaveBeenCalled();
        });
    });
})();