"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/compiler/testing');
var testing_2 = require('@angular/core/testing');
//import { disableDeprecatedForms, provideForms, FormControl } from '@angular/forms';
var ionic_angular_1 = require('ionic-angular');
var mocks_1 = require('../app/mocks');
//import { Utils }                                      from '../app/services/utils';
var testUtils_1 = require('./testUtils');
exports.TestUtils = testUtils_1.TestUtils;
/*
* disableDeprecatedForms(),
* provideForms(),
* Form,
*/
exports.providers = [
    core_1.provide(ionic_angular_1.Config, { useClass: mocks_1.ConfigMock }),
    core_1.provide(ionic_angular_1.App, { useClass: mocks_1.ConfigMock }),
    core_1.provide(ionic_angular_1.NavController, { useClass: mocks_1.NavMock }),
    core_1.provide(ionic_angular_1.Platform, { useClass: mocks_1.ConfigMock }),
];
exports.injectAsyncWrapper = (function (callback) { return testing_2.async(testing_2.inject([testing_1.TestComponentBuilder], callback)); });
exports.asyncCallbackFactory = (function (component, testSpec, detectChanges, beforeEachFn) {
    return (function (tcb) {
        return tcb.createAsync(component)
            .then(function (fixture) {
            testSpec.fixture = fixture;
            testSpec.instance = fixture.componentInstance;
            if (detectChanges)
                fixture.detectChanges();
            if (beforeEachFn)
                beforeEachFn(testSpec);
        })
            .catch();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlFeHBvcnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlFeHBvcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBMkQsZUFBZSxDQUFDLENBQUE7QUFDM0Usd0JBQTJELDJCQUEyQixDQUFDLENBQUE7QUFDdkYsd0JBQTJELHVCQUF1QixDQUFDLENBQUE7QUFDbkYscUZBQXFGO0FBQ3JGLDhCQUEyRCxlQUFlLENBQUMsQ0FBQTtBQUMzRSxzQkFBMkQsY0FBYyxDQUFDLENBQUE7QUFDMUUscUZBQXFGO0FBQ3JGLDBCQUEyRCxhQUFhLENBQUM7QUFBaEUsMENBQWdFO0FBRXpFOzs7O0VBSUU7QUFDUyxpQkFBUyxHQUFlO0lBQ2pDLGNBQU8sQ0FBQyxzQkFBTSxFQUFFLEVBQUMsUUFBUSxFQUFFLGtCQUFVLEVBQUMsQ0FBQztJQUN2QyxjQUFPLENBQUMsbUJBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxrQkFBVSxFQUFDLENBQUM7SUFDcEMsY0FBTyxDQUFDLDZCQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsZUFBTyxFQUFDLENBQUM7SUFDM0MsY0FBTyxDQUFDLHdCQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUUsa0JBQVUsRUFBQyxDQUFDO0NBQzFDLENBQUM7QUFFUywwQkFBa0IsR0FBYSxDQUFDLFVBQUMsUUFBUSxJQUFLLE9BQUEsZUFBSyxDQUFDLGdCQUFNLENBQUMsQ0FBQyw4QkFBb0IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQS9DLENBQStDLENBQUMsQ0FBQztBQUUvRiw0QkFBb0IsR0FBYSxDQUFDLFVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWTtJQUM1RixNQUFNLENBQUMsQ0FBQyxVQUFDLEdBQXlCO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQzthQUM5QixJQUFJLENBQUMsVUFBQyxPQUErQjtZQUNwQyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUMzQixRQUFRLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUM5QyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7Z0JBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztnQkFBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=