(function () {

    "use strict";

    describe("controller", function () {

        beforeEach(module("FoodOrderingApp"));

        describe("footer controller", function () {

            var _$scope;

            beforeEach(inject(function ($rootScope, $controller) {
                _$scope = $rootScope.$new();

                $controller("FooterController as footerCtrl", {

                    $scope: _$scope
                });
            }));

            it("testing variable whether it is defined", function () {
                expect(_$scope.footerCtrl.appName).toBeDefined();
            });
        });
    });

})();
