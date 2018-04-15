(function () {
    "use strict";

    beforeEach(module("FoodOrderingApp"));

    describe("component test", function () {
        var _$scope, _$controller;

        describe("Test FooterController", function ($rootScope, $controller) {

            var _$scope, _$controller, _APP_CONSTANT;

            beforeEach(inject(function (APP_CONSTANT, $rootScope, $controller) {
                _$scope = $rootScope.$new();
                _APP_CONSTANT = APP_CONSTANT;

                _$controller = function () {
                    return $controller('FooterController',{
                        _$scope: _$scope
                    });
                };

            }));

            describe('Test controller elements',function () {
                //test appName function
                it('appName function',function () {
                    var vm = _$controller();
                    var name = vm.appName();
                    expect(name).toBe('Food Ordering App');
                });
            });

        });

    });
})();


