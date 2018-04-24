(() => {
    'use strict';
    angular.module('FoodOrderingApp')
        .factory('ReviewService', ReviewService);

    ReviewService.$inject = ['$http', 'APP_CONSTANT', '$sessionStorage'];

    function ReviewService($http, APP_CONSTANT, $sessionStorage) {

        let appUrl = APP_CONSTANT.FOA_APP;

        let reviewService = {
            addReview: addReview,
            getUserReviewForRestaurant: getUserReviewForRestaurant
        };

        function addReview(userId, restId, review) {
            // return $http.post(appUrl + '/api/users/' + userId + '/reviews/' + restId);
            return $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: review,
                url: appUrl + '/api/users/' + userId + '/reviews/' + restId
            });
        }

        function getUserReviewForRestaurant(userId, restId) {
            return $http.get(appUrl + '/api/users/' + userId + '/reviews/' + restId);
        }

        return reviewService;
    }
})();

