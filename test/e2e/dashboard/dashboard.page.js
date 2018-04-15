(function () {
    "use strict";

    var DashboardPageObject = function () {

        this.appName = element(by.css("h1"));

        this.username = element(by.className("logged-in-user"));

        this.logoutOption = element(by.linkText("Logout"));

        this.addRestaurantLink = element(by.linkText("Add Restaurant"));

        this.restaurantName = element(by.model("restaurant.name"));

        this.restaurantContact = element(by.model("restaurant.contactNo"));

        this.addRestaurantButton = element(by.buttonText("Add Restaurant"));

        this.alertMessage = element(by.id("alertMessage"));

        this.addFoodLink = element(by.linkText("Add Food"));

        this.foodName = element(by.model("food.name"));

        this.restaurant = element.all(by.repeater("restaurant in foodCtrl.restaurants"));

        this.foodPrice = element(by.model("food.price"));

        this.addFoodButton = element(by.buttonText("Add Food"));

        this.foodList = element.all(by.repeater("food in dashboard.foodItems"));

        this.editFoodName = element(by.model("editFoodCtrl.foodDuplicate.name"));

        this.editFoodPrice = element(by.model("editFoodCtrl.foodDuplicate.price"));

        this.editFoodButton = element(by.buttonText("Edit Food"));

        this.deleteFoodButton = element(by.buttonText("Delete Food"));

        this.yesButton = element(by.buttonText("Yes"));

    };
    module.exports = DashboardPageObject;
})();