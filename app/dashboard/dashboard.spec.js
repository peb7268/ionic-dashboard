"use strict";
var http_1 = require('@angular/http');
var ionic_angular_1 = require('ionic-angular');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/Rx');
var dashboard_1 = require('./dashboard');
var data_service_1 = require('./data.service');
var globals_1 = require('./../globals');
var testing_1 = require('@angular/core/testing');
//Mock Setup Stuff
var mocks_1 = require('./../mocks');
var dataService = null;
var mockDataService = null;
var dataServiceSpy = null;
var dashSpy = null;
var httpMock = new mocks_1.HttpMock();
var navMock = null;
var tcb;
var observable = null;
//Our parent block
describe('Dashboard', function () {
    var platform;
    beforeEach(function () {
        testing_1.addProviders([
            { provide: http_1.Http, useClass: mocks_1.HttpMock },
            { provide: ionic_angular_1.NavController, useClass: mocks_1.NavMock },
            { provide: data_service_1.DataService, useClass: data_service_1.DataService }
        ]);
        //SET MOCKS
        window['App'] = new globals_1.App();
        navMock = new mocks_1.NavMock();
        platform = new mocks_1.MockClass();
        //Set Initial State
        window.localStorage.setItem('project_data', platform.getData());
        window.localStorage.setItem('project_id', '5');
        observable = new BehaviorSubject_1.BehaviorSubject(platform.getData());
        observable.next();
        dataService = new data_service_1.DataService(httpMock);
        mockDataService = new mocks_1.MockDataService(httpMock);
        //dashboard        = new Dashboard(navMock, dataService);
    });
    afterEach(function () {
        window['App'].activeRequests = 0;
        window.localStorage.clear();
    });
    describe('Dashboard', function () {
        it('Initial State is good', function () {
            var dashboard = new dashboard_1.Dashboard(navMock, dataService);
            var App = window['App'];
            var i = App.instances;
            //Assert Initial State
            expect(typeof App).toBe('object');
            expect(typeof i).toBe('object');
            expect(typeof i.dashboard).toBe('object');
            //Assert SUT
            expect(dashboard).toBeTruthy();
            expect(dashboard).not.toEqual(null);
        });
        //Specs not getting executed
        it('Dashboard.init', testing_1.inject([testing_1.TestComponentBuilder], function (builder) {
            tcb = builder;
            return tcb.createAsync(dashboard_1.Dashboard).then(function (fixture) {
                var dashboard = fixture.componentInstance.valueOf();
                spyOn(dashboard, 'init'); //.and.callThrough();
                dashboard.init();
                //fixture.detectChanges(); //trigger change detection
                var callCount = dashboard.init.calls.all().length;
                //console.log('callCount: ', callCount);
                expect(callCount).toBe(1);
                expect(dashboard.init).toHaveBeenCalledTimes(1);
            })
                .catch(function (e) {
                console.log('error: ');
                console.log(e.stack);
            });
        }));
        //Specs not getting executed
        it('Dashboard Fetches Data', testing_1.inject([testing_1.TestComponentBuilder], function (builder) {
            tcb = builder;
            return tcb.createAsync(dashboard_1.Dashboard).then(function (fixture) {
                var dashboard = fixture.componentInstance;
                spyOn(dashboard.dataService, 'fetchData').and.returnValue(observable);
                dashboard.init();
                expect(dashboard.dataService.fetchData).toHaveBeenCalled();
            })
                .catch(function (e) {
                console.log('error: ');
                console.log(e.stack);
            });
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoYm9hcmQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EscUJBQWdELGVBQWUsQ0FBQyxDQUFBO0FBRWhFLDhCQUFnRCxlQUFlLENBQUMsQ0FBQTtBQUdoRSxnQ0FBZ0Qsc0JBQXNCLENBQUMsQ0FBQTtBQUN2RSxRQUFPLFNBQVMsQ0FBQyxDQUFBO0FBRWpCLDBCQUFnRCxhQUFhLENBQUMsQ0FBQTtBQUM5RCw2QkFBZ0QsZ0JBQ2hELENBQUMsQ0FEK0Q7QUFDaEUsd0JBQWdELGNBQWMsQ0FBQyxDQUFBO0FBSS9ELHdCQUVrRCx1QkFBdUIsQ0FBQyxDQUFBO0FBRTFFLGtCQUFrQjtBQUNsQixzQkFLTyxZQUFZLENBQUMsQ0FBQTtBQUdwQixJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUM7QUFDL0IsSUFBSSxlQUFlLEdBQU8sSUFBSSxDQUFDO0FBQy9CLElBQUksY0FBYyxHQUFRLElBQUksQ0FBQztBQUMvQixJQUFJLE9BQU8sR0FBZSxJQUFJLENBQUM7QUFFL0IsSUFBSSxRQUFRLEdBQWMsSUFBSSxnQkFBUSxFQUFFLENBQUM7QUFDekMsSUFBSSxPQUFPLEdBQWUsSUFBSSxDQUFDO0FBRS9CLElBQUksR0FBRyxDQUFDO0FBQ1IsSUFBSSxVQUFVLEdBQVksSUFBSSxDQUFDO0FBRS9CLGtCQUFrQjtBQUNsQixRQUFRLENBQUMsV0FBVyxFQUFFO0lBQ2xCLElBQUksUUFBWSxDQUFDO0lBRWpCLFVBQVUsQ0FBQztRQUNULHNCQUFZLENBQUM7WUFDWCxFQUFDLE9BQU8sRUFBRSxXQUFJLEVBQUUsUUFBUSxFQUFFLGdCQUFRLEVBQUM7WUFDbkMsRUFBQyxPQUFPLEVBQUUsNkJBQWEsRUFBRSxRQUFRLEVBQUUsZUFBTyxFQUFDO1lBQzNDLEVBQUMsT0FBTyxFQUFFLDBCQUFXLEVBQUUsUUFBUSxFQUFFLDBCQUFXLEVBQUM7U0FDOUMsQ0FBQyxDQUFBO1FBRUYsV0FB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