(function () {
    "use strict";
    var Dashboard = require("../dashboard/dashboard.page.js");

    describe("dashboard", function () {

        var baseUrl = browser.baseUrl,
            dashboard = new Dashboard();

        beforeEach(function () {
            browser.get("#!/dashboard");
        });

        describe("dashboard page elements", function () {

            it("should load the dashboard page", function () {
                browser.getCurrentUrl().then(function (url) {
                    expect(url).toBe(baseUrl + "#!/dashboard");
                });
                expect(dashboard.appName.getText()).toBe("Food Voting App");
            });

            it("should display username and logout option", function () {
                expect(dashboard.username.isPresent()).toBeTruthy();
                console.log("working....")
                expect(dashboard.logoutOption.isPresent()).toBeTruthy();
                console.log("working....");
            });

            it("should add restaurant and food", function () {
                dashboard.addRestaurantLink.click();
                browser.sleep(2000);
                dashboard.restaurantName.sendKeys("KFC");
                dashboard.restaurantContact.sendKeys("9860232805");
                browser.sleep(2000);
                dashboard.addRestaurantButton.click();
                browser.sleep(2000);
                expect(dashboard.alertMessage.isDisplayed()).toBeTruthy();

                dashboard.addFoodLink.click();
                dashboard.foodName.sendKeys("Chicken Roast");
                dashboard.restaurant.get(0).click();
                dashboard.restaurant.first().click();
                dashboard.foodPrice.sendKeys(450);
                browser.sleep(3000)
                dashboard.addFoodButton.click();
                browser.sleep(2000);
                expect(dashboard.foodList.count()).toBe(1);
                dashboard.foodList.first().all(by.tagName("td")).get(1).click();
                dashboard.editFoodName.clear();
                dashboard.editFoodName.sendKeys("Mashu Bhat");
                dashboard.editFoodPrice.clear();
                dashboard.editFoodPrice.sendKeys(550);
                dashboard.editFoodButton.click();
                browser.sleep(2000);

                dashboard.foodList.first().all(by.tagName("td")).get(1).click();
                dashboard.deleteFoodButton.click();
                browser.sleep(2000);
                dashboard.yesButton.click();
            });
        });
    });

})();