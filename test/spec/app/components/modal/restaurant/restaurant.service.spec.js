"use strict";

describe("service test", function () {

    beforeEach(module("FoodVotingApp"));

    describe("restaurant service", function () {

        var RestaurantService;

        beforeEach(inject(function (_RestaurantService_) {
            RestaurantService = _RestaurantService_;
        }));

        it("should define service methods", function () {

            expect(RestaurantService.setRestaurant).toBeDefined();
            expect(RestaurantService.getRestaurantList).toBeDefined();
            expect(RestaurantService.setAlertMessage).toBeDefined();
            expect(RestaurantService.getAlertMessage).toBeDefined();

        });

    });

});