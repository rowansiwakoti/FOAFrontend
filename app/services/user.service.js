(function () {

    'use strict';

    angular.module('FoodOrderingApp')

        .factory('UserService', UserService);

    UserService.$inject = [
        '$http',
        'APP_CONSTANT',
        '$q',
        'ApiService'
    ];

    function UserService($http, APP_CONSTANT, $q, ApiService) {

        var appUrl = APP_CONSTANT.FOA_APP;

        var userSvc = {
            setUser: setUser,
            validateUser: validateUser,
            getUsers: getUsers,
            num:8
        };


        function setUser(user) {
            user.balance = 1200;
            return ApiService.post('/user', null, user);
            // var req = {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     data: user,
            //     url: appUrl + '/user'
            // };
            // return ($http(req));
        }

        function validateUser(user) {
            var req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user,
                url: appUrl + '/user/verify'
            };
            return ($http(req));
        }

        function getUsers() {
            return ($http.get(appUrl + '/user'));
        }

        return userSvc;

    }
})();