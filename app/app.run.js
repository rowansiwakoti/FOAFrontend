(function () {
        'use strict';

        angular.module('FoodOrderingApp')
            .run(appRun);

        appRun.$inject = ['$state', '$rootScope', 'LoggedInService'];

        function appRun($state, $rootScope, LoggedInService) {
            $rootScope.$on('$stateChangeStart', stateChanged);

            stateChanged.$inject = ['event', 'toState', 'toParams', 'fromState', 'fromParams'];

            function stateChanged(event, toState, toParams, fromState, fromParams) {

                var loggedIn = LoggedInService.getLoggedIn();
                if (loggedIn === 0 && toState.name !== 'login') {
                    // event.preventDefault();
                    // $state.go('login');
                    return false;
                }
            }
        }
    })();