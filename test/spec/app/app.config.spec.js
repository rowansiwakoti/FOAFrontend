"use strict";

describe("config test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("app configuration", function () {

        var $rootScope, $state;

        beforeEach(inject(function (_$rootScope_, _$state_) {
            $rootScope = _$rootScope_.$new();
            $state = _$state_;
        }));

        it("should test the routing url", function () {

            expect($state.current.name).toBe("");
            expect($state.current.url).toBe("^");
            expect($state.current.views).toBeNull();

        });

    });

});