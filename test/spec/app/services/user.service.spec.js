(function () {
    "use strict";

    beforeEach(module("FoodOrderingApp"));

    describe('Testing User Service',function () {
        var _UserService, _$httpBackend, user, _$http, _$scope;

        beforeEach(inject(function (UserService, $httpBackend, $http, $rootScope) {
            _$httpBackend = $httpBackend;
            _$scope = $rootScope;
            _$http = $http;
            user = {};
            _UserService = function () {
                return UserService;
            };
        }));

        describe('User Service elements', function () {
            //Check setUser function
            it('setUser function', function () {
                spyOn(_$http,'post').and.callThrough();
                var vm = _UserService();
                vm.setUser(user);
                _$scope.apply();
                expect(_$http.post).toHaveBeenCalled();
            });
        });
    });

})();
