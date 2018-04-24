(() => {
    'use strict';

    angular.module('FoodOrderingApp')
        .directive('warnOnLeave', warnOnLeave);

    warnOnLeave.$inject = ['$uibModal', '$state', '$window'];

    function warnOnLeave($uibModal, $state, $window) {
        return {

            require: '?form',

            restrict: 'EA',

            link: (scope, elem, attrs, form) => {

                if (form !== null) {
                    var $locationChangeStartUnbind = scope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {

                        if (form.$dirty && !form.$submitted) {

                            event.preventDefault();

                            var modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: './directives/warn-on-leave/warn-on-leave-modal.html',
                                controller: 'WarnOnLeaveController as warnOnLeaveCtrl',
                                size: 'sm'
                            });

                            modalInstance.result.then(() => {
                                form.$setPristine();
                                $state.go(toState);
                            }, () => {
                                event.preventDefault();
                            });
                        }
                    });

                    scope.$on('$destroy', () => {
                        $window.onbeforeonload = null;
                        $locationChangeStartUnbind();
                    });
                }
            }
        };
    }

})();