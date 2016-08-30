"use strict";
var app_1 = require('./app');
//Import Testing Stuff
var testing_1 = require('@angular/platform-browser-dynamic/testing');
var testing_2 = require('@angular/core/testing');
var mocks_1 = require('./mocks');
testing_2.setBaseTestProviders(testing_1.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, testing_1.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
var myApp = null;
//Our parent block
describe('App', function () {
    beforeEach(function () {
        var platform = (new mocks_1.MockClass());
        myApp = new app_1.MyApp(platform);
    });
    describe('Initial Test', function () {
        it('should be on', function () {
            var one = 2;
            expect(typeof one).toBe('number');
        });
    });
});
//# sourceMappingURL=app.spec.js.map