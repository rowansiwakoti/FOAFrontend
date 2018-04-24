(function(){
    'use strict';

    angular.module('FoodOrderingApp.Services.API',[]);
})();

(function(){
    'use strict';

    angular.module('FoodOrderingApp.Services.API')
        .factory('ApiService',ApiService);

    ApiService.$inject = ['$http', '$q', 'APP_CONSTANT'];

    function ApiService($http, $q, APP_CONSTANT){
        var appUrl = APP_CONSTANT.FOA_APP;

        var service = {
            get: get,
            post: post,
            put: put,
            delete: remove
        }

        return service;

        function get(path, params, responseType){
            return _doMethod('GET', path, params,'' ,'', responseType  );
        }

        function post(path, params, data, headers, responseType, transformRequest){
            return _doMethod('POST', path, params, data, headers, responseType);
        }

        function put(){

        }

        function remove(){

        }

        function _doMethod(method, path, params, data, headers, responseType){
            var deferred = $q.defer();

            headers = headers || {};

            $http({
                method: method,
                url: appUrl + path,
                params: params,
                data: data,
                headers: headers,
                responseType: responseType
            })
            .then(function(response){
                console.log(response.status);
                if(response.status !== 200)
                    return deferred.reject(response);
                else
                    return deferred.resolve(response);  //response.data
            })
            .catch(function(error){
                return deferred.reject();
            })

            return deferred.promise;
        }
    }
})();