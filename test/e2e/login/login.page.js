(function () {
    "use strict";
    var LoginPageObject = function () {
        this.appName = element(by.css("h1"));
        this.pageName = element(by.css("h3"));

        this.usernameLabel = element(by.name("user_name"));
        this.passwordLabel = element(by.name("pass_word"));
        this.username = element(by.model("loginCtrl.user.emailId"));
        this.password = element(by.model("loginCtrl.user.password"));

        this.loginButton = element(by.buttonText("Login"));

        this.footerContent = element(by.tagName("a"));
    };
    module.exports = LoginPageObject;
})();