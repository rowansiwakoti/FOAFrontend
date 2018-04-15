"use strict";

describe("controller", function () {

    beforeEach(module("FoodVotingApp"));

    describe("logout controller", function () {

        var $scope, $uibModalInstance;

        beforeEach(inject(function (_$rootScope_, $controller) {

            $scope = _$rootScope_.$new();
            $uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);

            $controller("LogoutController as logoutCtrl", {

                $scope: $scope,
                $uibModalInstance: $uibModalInstance

            });

        }));

        it("should define the page constant", function () {
            expect($scope.logoutCtrl.logoutMsg).toBeDefined();
        });

        it("should let the user dismiss the modal", function () {

            expect($scope.logoutCtrl.cancel).toBeDefined();
            $scope.logoutCtrl.cancel();
            expect($uibModalInstance.dismiss).toHaveBeenCalled();

        });

        it("should let the user confirm the modal", function () {

            expect($scope.logoutCtrl.ok).toBeDefined();
            $scope.logoutCtrl.ok();
            expect($uibModalInstance.close).toHaveBeenCalled();

        });
    });

});