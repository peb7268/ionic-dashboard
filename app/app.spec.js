"use strict";
var app_1 = require('./app');
var globals_1 = require('./globals');
//Import Testing Stuff
var testing_1 = require('@angular/platform-browser-dynamic/testing');
var testing_2 = require('@angular/core/testing');
var mocks_1 = require('./mocks');
testing_2.setBaseTestProviders(testing_1.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, testing_1.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
window['App'] = new globals_1.App();
var myApp = null;
//Our parent block
describe('App', function () {
    beforeEach(function () {
        var platform = (new mocks_1.MockClass());
        myApp = new app_1.MyApp(platform);
    });
    describe('App Initialize', function () {
        it('App component', function () {
            var cache_settings = myApp.cache_settings;
            expect(cache_settings).toBeNull();
        });
    });
    xdescribe('Should update metrics when studies are changed', function () {
        it('should update the netattraction chart when a new study is selected', function () {
            expect(1).toEqual(2);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsb0JBQXlDLE9BQU8sQ0FBQyxDQUFBO0FBQ2pELHdCQUF5QyxXQUFXLENBQUMsQ0FBQTtBQUtyRCxzQkFBc0I7QUFDdEIsd0JBQXFHLDJDQUEyQyxDQUFDLENBQUE7QUFDakosd0JBQXlDLHVCQUF1QixDQUFDLENBQUE7QUFDakUsc0JBQXlDLFNBQVMsQ0FBQyxDQUFBO0FBRW5ELDhCQUFvQixDQUFDLGlEQUF1QyxFQUFFLG9EQUEwQyxDQUFDLENBQUM7QUFFMUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxLQUFLLEdBQU8sSUFBSSxDQUFDO0FBRXJCLGtCQUFrQjtBQUNsQixRQUFRLENBQUMsS0FBSyxFQUFFO0lBQ1osVUFBVSxDQUFDO1FBQ1QsSUFBSSxRQUFRLEdBQUcsQ0FBTSxJQUFJLGlCQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLEtBQUssR0FBRyxJQUFJLFdBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUMxQixFQUFFLENBQUMsZUFBZSxFQUFFO1lBQ25CLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7WUFDMUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLENBQUMsZ0RBQWdELEVBQUU7UUFDeEQsRUFBRSxDQUFDLG9FQUFvRSxFQUFFO1lBQ3JFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=