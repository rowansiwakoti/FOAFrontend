(function () {
    'use strict';

    beforeEach(module('FoodOrderingApp'));

    describe('Testing the Login controller', function () {
        var _$scope, _$state, _$sessionStorage, _$timeout, _UserService, _$controller, _$http;

        beforeEach(inject(function ($rootScope, $state, $sessionStorage, $timeout, UserService, $controller, $http) {
            _$state = $state;
            _$sessionStorage = $sessionStorage;
            _$timeout = $timeout;
            _UserService = UserService;
            _$http = $http;

            _$scope = $rootScope.$new();

            $controller("LoginController as loginCtrl", {
                $scope: _$scope,
                UserService : _UserService
            });


        }));

        describe('check the controller components', function () {
            it('check controller elements', function () {

                spyOn(_UserService,'validateUser').and.callThrough();
                spyOn(_$scope.loginCtrl,'validateUser').and.callThrough();

                expect(_$scope.loginCtrl.inputType).toBe('password');
                expect(_$scope.loginCtrl.dataLoading).not.toBeTruthy();

                var user = {
                  'email':'rowansiwakoti@gmail.com',
                  'userPassword':'f1soft'
                };

                _$scope.loginCtrl.validateUser(user);

                expect(_$scope.loginCtrl.validateUser).toHaveBeenCalled();
                expect(_UserService.validateUser).toHaveBeenCalled();

            });
        });
    });
})();