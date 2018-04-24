angular.module('FoodOrderingApp')
    .controller('ReviewController', ReviewController);

ReviewController.$inject = ['$uibModalInstance', '$sessionStorage', 'ReviewService', 'RestaurantId', '$state'];

function ReviewController($uibModalInstance, $sessionStorage, ReviewService, RestaurantId, $state) {

    var vm = this;

    //variables
    vm.rating = 2;
    vm.max = 5;
    vm.readonly = false;
    vm.reviewMessage = '';

    let userId = $sessionStorage.userId;
    let restId = RestaurantId;  //received from review modal's resolve property.

    //functions
    vm.addReview = addReview;
    vm.cancelModal = cancelModal;
    vm.onLeave = onLeave;
    vm.onHover = onHover;
    vm.onChange = onChange;

    /*The response object has these properties:
        data – {string|Object} – The response body transformed with the transform functions.
        status – {number} – HTTP status code of the response.
        headers – {function([headerName])} – Header getter function.
        config – {Object} – The configuration object that was used to generate the request.
        statusText – {string} – HTTP status text of the response.*/

    function addReview(message, rating) {
        let review = {
            message: message,
            rating: rating
        };
        ReviewService.addReview(userId, restId, review)
            .then(function (success) {
               console.log(success.data.message);

            })
            .catch(function (error) {
               console.log(error.status);
            });
        $uibModalInstance.close();

    }

    function cancelModal() {
        $uibModalInstance.dismiss();
    }

    function onLeave() {
        vm.hoverVal = null;
    }

    function onHover(val) {
        vm.hoverVal = val;
    }

    function onChange(val) {
        vm.rating = val;
    }

}