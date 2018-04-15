(function(){
    angular.module('FoodOrderingApp')
        .factory('Utility',Utility);

    Utility.$inject = [];

    function Utility(){

        var service ={
            isEmpty: isEmpty
        }
        return service;

        function isEmpty(obj){
            return angular.isUndefined(obj) || obj === null;
        }
    }
})();