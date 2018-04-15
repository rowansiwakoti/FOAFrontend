// jshint strict: false
module.exports = function (config) {

    config.set({

        basePath: './',

        files: [

            '../app/assets/libs/angular/angular.min.js',
            '../app/assets/libs/angular/angular-messages.min.js',
            '../app/assets/libs/angular/angular-ui-router.min.js',
            '../app/assets/libs/angular/ngStorage.min.js',
            '../app/assets/libs/angular/angular-animate.min.js',
            '../app/assets/libs/angular/angular-sanitize.min.js',
            '../app/assets/libs/angular/ui-bootstrap-tpls.min.js',
            '../app/assets/libs/angular/angular-mocks.js',
            '../app/assets/libs/jquery/jquery.min.js',
            '../app/assets/libs/jquery/popper.min.js',
            '../app/assets/libs/bootstrap/bootstrap.min.js',

            // source files
            '../app/app.module.js',
            '../app/app.config.js',
            '../app/components/**/*.js',
            '../app/services/**/*.js',
            '../app/constants/**/*.js',
            '../app/services/user.service.js',

            // spec files
            './spec/app/components/footer/footer.controller.spec.js',
            './spec/app/components/restaurant/restaurant.controller.spec.js',
            './spec/app/components/register/register.controller.spec.js',
            './spec/app/components/registration-success/registration-success.controller.spec.js',
            './spec/app/components/order-list/order-list.controller.spec.js',
            './spec/app/components/order-bill/order-bill.controller.spec.js'
        ],


        exclude: ['test/e2e/**'],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        singleRun: true,

        plugins: [
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            '../app/components/**/*.js': ['coverage'],
            '../app/services/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            check: {
                global: {
                    statements: 85,
                    lines: 85,
                    functions: 85,
                    branches: 83
                }
            }
        }

    });
};