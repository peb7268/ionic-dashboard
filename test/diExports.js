"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/compiler/testing');
var testing_2 = require('@angular/core/testing');
//import { disableDeprecatedForms, provideForms, FormControl } from '@angular/forms';
var ionic_angular_1 = require('ionic-angular');
var mocks_1 = require('./mocks');
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
//# sourceMappingURL=diExports.js.map