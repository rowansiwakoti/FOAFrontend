angular.module('FoodOrderingApp')
    .directive('star', star);

// star.$inject = [''];

function star() {
    return {

        // restrict: 'A',

        // replace: true,

        template: '<ul class="rating" ng-mouseleave="leave()">' +
        '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
        '\u2605' +
        '</li>' +
        '</ul>',

        scope: {
            rating: '=',
            max: '=',
            readonly: '@',
            onHover: '=',
            onLeave: '='
        },

        controller: function ($scope) {
            $scope.rating = $scope.rating || 0;
            $scope.max = 5;
            $scope.click = function (val) {
                if ($scope.readonly && $scope.readonly === 'true') {
                    return;
                }
                $scope.rating = val;
            };
            $scope.over = function (val) {
                $scope.onHover(val);
            };
            $scope.leave = function () {
                $scope.onLeave();
            }
        },

        link: function (scope, element, attrs) {
            element.css("text-align", "right");
            let updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.rating
                    });
                }
            };
            updateStars();

            scope.$watch('rating', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
            scope.$watch('max', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
}