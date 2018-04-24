// created by rowan siwakoti
(() => {
    'use strict';

    angular.module('FoodOrderingApp', [
        'ngAnimate',
        'ui.bootstrap',
        'ngSanitize',
        'ui.router',
        'ngStorage',
        'ngMessages',
        'FoodOrderingApp.Components',
        'FoodOrderingApp.Services',
        'FoodOrderingApp.Orders',
        'ui.router.state.events'
    ]);
})();

//Components
(() => {
    'use strict';

    angular.module('FoodOrderingApp.Components', [
        'FoodOrderingApp.Components.Login',
        // 'FoodOrderingApp.Components.Dashboard',
        'FoodOrderingApp.Components.Compare',
        'FoodOrderingApp.Components.Favourite',
    ]);
})();

//Services
(() => {
    'use strict';

    angular.module('FoodOrderingApp.Services', [
        'FoodOrderingApp.Services.FoodCompare',
        'FoodOrderingApp.Services.FavouriteRestaurant'
    ]);
})();