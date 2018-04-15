(function () {
    beforeEach(module('FoodOrderingApp'));

    describe('User Profile Controller',function () {
        var _$scope, _$controller, _$uibModalInstance, _$sesionStorage, _balance=1200, _$uibModal, _OrderService, _$log, _$rootScope, _$q, _RestaurantService;

        beforeEach(inject(function ($sessionStorage, $uibModal, RestaurantService, OrderService, $log, $rootScope, $controller, $q) {
            _$scope = $rootScope.$new();
            _$q = $q;
            _$uibModalInstance = jasmine.createSpyObj("$uibModalInstance", ["close", "dismiss"]);
            _$uibModal = $uibModal;
            _$sesionStorage = $sessionStorage;
            _RestaurantService = RestaurantService;
            _OrderService = OrderService;
            _$log = $log;
            _$rootScope = $rootScope;

            _$controller = function () {
              return $controller('UserProfileController',{
                  $scope: _$scope,
                  $uibModalInstance: _$uibModalInstance,
                  balance: _balance
              });
            };
        }));

        describe('Test Controller elements',function () {
            //Test closeModal fuction
            it('Test closeModal fuction', function () {
                var vm = _$controller();
                vm.closeModal();
                expect(_$uibModalInstance.close).toHaveBeenCalled();
            });

            //Test userLogout function for success
            it('Test userLogout function', function () {
                var modalInstance = {};
                var deferred = _$q.defer();
                deferred.resolve(modalInstance);
                var mockModalInstance = {result: deferred.promise};
                spyOn(_$uibModal,'open').and.returnValue(mockModalInstance);
                spyOn(_RestaurantService,'getAlertMessage').and.callThrough();
                var vm = _$controller();
                vm.userLogout();
                _$scope.$apply();
                expect(_RestaurantService.getAlertMessage).toHaveBeenCalled();
                expect(_$uibModal.open).toHaveBeenCalled();
            });

            //Test userLogout function for success
            it('Test userLogout function', function () {
                var modalInstance = {};
                var deferred = _$q.defer();
                deferred.reject(modalInstance);
                var mockModalInstance = {result: deferred.promise};
                spyOn(_$uibModal,'open').and.returnValue(mockModalInstance);
               spyOn(_$log,'info').and.callThrough();
                var vm = _$controller();
                vm.userLogout();
                _$scope.$apply();
                expect(_$log.info).toHaveBeenCalled();
                expect(_$uibModal.open).toHaveBeenCalled();
            });

        });

    });
})();