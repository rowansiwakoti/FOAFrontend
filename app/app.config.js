(function () {

    'use strict';

    angular.module('FoodOrderingApp')
        .config(config);


    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        '$qProvider'
    ];
    function config($stateProvider, $urlRouterProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(true);
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.html',
                controller: 'LoginController as loginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'components/dashboard/dashboard.html',
                controller: 'DashboardController as dashboardCtrl'
            })
            .state('restaurant', {
                url: '/restaurant',
                templateUrl: 'components/restaurant/restaurant.html',
                controller: 'RestaurantController as restaurantCtrl',
                params: {
                    restaurant: ''
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'components/register/register.html',
                controller: 'RegisterController as registerCtrl'
            })
            .state('orderBill', {
                url: '/orderBill',
                templateUrl: 'components/order-bill/order-bill.html',
                controller: 'OrderBillController as orderBillCtrl',
                params: {
                    order: null
                }
            })
            .state('registrationSuccess', {
                url: '/registrationSuccess',
                templateUrl: 'components/registration-success/registration-success.html',
                controller: 'RegistrationSuccessController as registrationSuccessCtrl'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'components/users/user.html',
                controller: 'UserController as userCtrl'
            })
            .state('orders', {
                url: '/orders',
                templateUrl: 'components/orders/orders.html',
                controller: 'OrdersController as ordersCtrl'
            })
            .state('orders.today', {
                url: '/today',
                templateUrl: 'components/orders/today/today.html',
                controller: 'TodayController as todaysCtrl'
            })
            .state('orders.month', {
                url: '/month',
                templateUrl: 'components/orders/month/month.html',
                controller: 'MonthController as monthsCtrl'
            })
            .state('compareList',{
                url:'/compare',
                templateUrl:'components/compare/compare.html',
                controller:'CompareController as compareCtrl'
            })
        ;
        // $locationProvider.html5Mode(true);
    }

})();