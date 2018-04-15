//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
      '../test/e2e/dashboard/dashboard.e2e.js',
      '../test/e2e/dashboard/dashboard.page.js',
     '../test/e2e/login/login.e2e.js',
      '../test/e2e/dashboard/dashboard.e2e.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
