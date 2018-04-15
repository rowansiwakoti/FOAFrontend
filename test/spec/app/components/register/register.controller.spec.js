(function () {
    "use strict";

    describe('Register Controller', function () {


        beforeEach(module('FoodOrderingApp'));

        var _$scope, _$controller, _$state, _$log, _$timeout, _mockUserService, _$q, deferred;

        beforeEach(inject(function ($rootScope, $state, $log, $timeout, UserService, $q, $controller) {

            _$scope = $rootScope.$new();
            _$state = $state;
            _$log = $log;
            _$timeout = $timeout;
            _mockUserService = UserService;
            _$q = $q;
            deferred = _$q.defer();
            _$controller = $controller('RegisterController', {
                $scope: _$scope,
                $timeout: _$timeout
            });
        }));


        it('should test on backToLogin function', function () {
            spyOn(_$state, 'go').and.callThrough();
            _$controller.backToLogin();
            expect(_$state.go).toHaveBeenCalled();
        });

        it('should resolve/reject promise on register user function when a password is provided', function () {

            var mockUser = {
                userPassword: 'f1soft',
                confirmPassword: 'f1soft'
            };

            spyOn(_mockUserService, 'setUser').and.callThrough();
            spyOn(_$state, 'go').and.callThrough();

            var response = {data: {}};
            deferred.resolve(response);
            _$scope.$apply();

            _$controller.registerUser(mockUser);
            expect(_mockUserService.setUser).toHaveBeenCalled();

        });

        it('should reject promise on register user function when invalid password is provided', function () {
            var mockUser = {
                userPassword: 'f1s0ft',
                confirmPassword: 'hello'
            }
            _$controller.registerUser(mockUser);
        });

    });

})();