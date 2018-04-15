"use strict";

describe("controller test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("restaurant controller", function () {

        var $scope, $uibModalInstance;

        beforeEach(inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();
            $uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);

            $controller("RestaurantController as restaurantCtrl", {
                $scope: $scope,
                $uibModalInstance: $uibModalInstance
            });
        }));

        it("should define the page constants", function () {
            expect($scope.restaurantCtrl.resNameReqMsg).toBeDefined();
            expect($scope.restaurantCtrl.contactNoMsg).toBeDefined();
            expect($scope.restaurantCtrl.numbersOnlyMsg).toBeDefined();
        });

        it("should let user dismiss the modal", function () {
            expect($scope.restaurantCtrl.cancel).toBeDefined();
            $scope.restaurantCtrl.cancel();
            expect($uibModalInstance.dismiss).toHaveBeenCalled();
        });

        it("should let the user confirm the modal", function () {
            expect($scope.restaurantCtrl.ok).toBeDefined();
            $scope.restaurantCtrl.ok({name: "KFC"});
            expect($uibModalInstance.close).toHaveBeenCalled();
        });

    });

});