(function(){
    'use strict';
    angular.module('FoodOrderingApp')
        .directive('fileModel', fileModel);

    fileModel.$inject = ['$parse'];

    function fileModel($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        if (attrs.multiple) {
                            modelSetter(scope, element[0].files);
                        }
                        else {
                            modelSetter(scope, element[0].files[0]);
                        }
                    });
                });
            }
        };
    }
})();