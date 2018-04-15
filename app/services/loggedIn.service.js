(function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .factory('LoggedInService', LoggedInService);

        LoggedInService.$inject = [];

        function LoggedInService() {
            var loggedInSvc = {
                getLoggedIn: getLoggedIn,
                setLoggedIn: setLoggedIn
            };

            var loggedIn = 0;
            var emailId = '';
            var balance = 0;

            function setLoggedIn() {
                loggedIn = 1;
            }

            function getLoggedIn() {
                return loggedIn;
            }

            return loggedInSvc;
        }
    })();