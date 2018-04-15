(function () {
    "use strict";
    var Login = require("../login/login.page.js");

    describe("login", function () {
        var baseUrl = browser.baseUrl,
            login = new Login();

        beforeEach(function () {
            browser.get("#!/login");
        });

        describe("Login page elements", function () {

            it("should load the login page and check the app name", function () {
                browser.getCurrentUrl().then(function (url) {
                    expect(url).toBe(baseUrl + "#!/login");
                });
                expect(login.appName.getText()).toBe("Food Voting App");
            });

            it("should test the page name", function () {
                expect(login.pageName.getText()).toBe("User Login");
            });

            it("should test on the footer content", function () {
                expect(login.footerContent.getText()).toBe("Food Voting App");
            });

            it("should check on labels and input fields", function () {
                expect(login.usernameLabel.getText()).toBe("Username");
                login.username.sendKeys("rowanfa");
                browser.sleep(2000);
                expect(login.passwordLabel.getText()).toBe("Password");
                login.password.sendKeys("rowanfa@123");
                browser.sleep(2000);
                login.loginButton.click();
                browser.sleep(2000);
            });
        });
    });
})();