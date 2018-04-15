"use strict";

describe("component test", function () {

    beforeEach(module("FoodOrderingApp"));

    describe("header component", function () {

        var $componentController;

        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;
        }));

        it("should test on header component", function () {

            expect($componentController).toBeDefined();

        });
    });
});








