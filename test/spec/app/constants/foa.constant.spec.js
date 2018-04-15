(function () {
    'use strict';
    beforeEach(module('FoodOrderingApp'));

    describe('Testing the App constant file',function () {
        beforeEach(inject(function (_APP_CONSTANT_) {
            APP_CONSTANT = _APP_CONSTANT_;
        }));

        describe('Testing constant values',function () {
            //Checking the app name constant
            it('Check App Name',function () {console.log(APP_CONSTANT);
                expect(APP_CONSTANT.APP_NAME).toBe('Food Order ing App');
            });

        });
    });
})();