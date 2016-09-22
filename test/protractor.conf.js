var browser;
// Screenshot Reporter needs declaring outside the export as it's used in multiple hooks
var SSReporter = require('protractor-jasmine2-screenshot-reporter');
var screenshotReporter = new SSReporter({
    dest: 'coverage/screenshots',
    pathBuilder: function (currentSpec, suites) {
        var name = currentSpec.fullName;
        var testname = name.replace(/\s+/g, '-').toLowerCase();
        return testname;
    },
    filename: 'index.html'
});
exports.config = {
    baseUrl: 'http://localhost:8100',
    specs: [
        '../www/build/test/**/*.e2e.js'
    ],
    exclude: [],
    framework: 'jasmine2',
    allScriptsTimeout: 110000,
    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },
    directConnect: true,
    capabilities: {
        'browserName': 'chrome'
    },
    // hook into screenshotReporter's beforeLaunch
    beforeLaunch: function () {
        return new Promise(function (resolve) {
            screenshotReporter.beforeLaunch(resolve);
        });
    },
    onPrepare: function () {
        var SpecReporter = require('jasmine-spec-reporter');
        // Add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: true }));
        // Add screenshot reporter
        jasmine.getEnv().addReporter(screenshotReporter);
        // Define browser size for tests/screenshots
        var width = 360;
        var height = 640;
        browser.driver.manage().window().setSize(width, height);
        browser.ignoreSynchronization = false;
    },
    // hook into screenshotReporter's afterLaunch
    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdHJhY3Rvci5jb25mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvdHJhY3Rvci5jb25mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLElBQUksT0FBVyxDQUFDO0FBRWhCLHdGQUF3RjtBQUN4RixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMseUNBQXlDLENBQUMsQ0FBQztBQUNwRSxJQUFJLGtCQUFrQixHQUFHLElBQUksVUFBVSxDQUFFO0lBQ3ZDLElBQUksRUFBRSxzQkFBc0I7SUFDNUIsV0FBVyxFQUFFLFVBQVMsV0FBVyxFQUFFLE1BQU07UUFDdkMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2RCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxRQUFRLEVBQUUsWUFBWTtDQUN2QixDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsTUFBTSxHQUFHO0lBQ2IsT0FBTyxFQUFFLHVCQUF1QjtJQUVoQyxLQUFLLEVBQUU7UUFDTCwrQkFBK0I7S0FDaEM7SUFFRCxPQUFPLEVBQUUsRUFBRTtJQUVYLFNBQVMsRUFBRSxVQUFVO0lBRXJCLGlCQUFpQixFQUFFLE1BQU07SUFFekIsZUFBZSxFQUFFO1FBQ2YsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFLElBQUk7UUFDaEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsaUJBQWlCLEVBQUUsS0FBSztRQUN4QixzQkFBc0IsRUFBRSxNQUFNO0tBQy9CO0lBRUQsYUFBYSxFQUFFLElBQUk7SUFFbkIsWUFBWSxFQUFFO1FBQ1osYUFBYSxFQUFFLFFBQVE7S0FDeEI7SUFFRCw4Q0FBOEM7SUFDOUMsWUFBWSxFQUFFO1FBQ1osTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTztZQUNqQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxFQUFFO1FBQ1QsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFcEQsNEJBQTRCO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxZQUFZLENBQUMsRUFBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUUsMEJBQTBCO1FBQzFCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVqRCw0Q0FBNEM7UUFDNUMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFeEQsT0FBTyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLFdBQVcsRUFBRSxVQUFTLFFBQVE7UUFDNUIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTztZQUNqQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxzQkFBc0IsRUFBRSxJQUFJO0NBQy9CLENBQUMifQ==