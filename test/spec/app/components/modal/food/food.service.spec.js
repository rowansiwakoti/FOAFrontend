"use strict";

describe("service test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("food service", function () {

        var FoodService;

        beforeEach(inject(function (_FoodService_) {

            FoodService = _FoodService_;

        }));

    });
});