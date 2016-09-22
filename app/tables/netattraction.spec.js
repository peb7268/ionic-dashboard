"use strict";
var http_1 = require('@angular/http');
var ionic_angular_1 = require('ionic-angular');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/Rx');
var netattraction_1 = require('./netattraction');
var chart_1 = require('../charts/chart');
var dashboard_1 = require('../dashboard/dashboard');
var data_service_1 = require('../dashboard/data.service');
var testing_1 = require('@angular/core/testing');
//Mock Setup Stuff
var mocks_1 = require('./../mocks');
var platform;
var httpMock = new mocks_1.HttpMock();
var tcb;
var dashboard;
var chart;
var netattraction;
var data;
var dataService;
var navMock;
var observable;
//Our parent block
describe('Netattraction', function () {
    beforeEach(function () {
        testing_1.addProviders([
            { provide: ionic_angular_1.Platform, useClass: mocks_1.MockClass },
            { provide: http_1.Http, useClass: mocks_1.HttpMock },
            { provide: ionic_angular_1.NavController, useClass: mocks_1.NavMock },
            { provide: data_service_1.DataService, useClass: mocks_1.MockDataService },
        ]);
        platform = new mocks_1.MockClass();
        navMock = new mocks_1.NavMock();
        window.localStorage.setItem('project_data', JSON.stringify(platform.getData()));
        data = platform.getData();
        var _data = JSON.stringify(data);
        //Set Initial State
        window.localStorage.setItem('project_data', _data);
        window.localStorage.setItem('project_id', '5');
        observable = new BehaviorSubject_1.BehaviorSubject(data);
        observable.next(data);
        dataService = new data_service_1.DataService(httpMock);
        spyOn(dataService, 'fetchData').and.returnValue(observable);
        chart = new chart_1.Chart(dataService);
        netattraction = new netattraction_1.Netattraction();
    });
    afterEach(function () {
        //chart = null;
        window['App'].activeRequests = 0;
        window.localStorage.clear();
    });
    describe('Creation', function () {
        xit('should wait on the data to load before rendering', function () { });
        it('Should have the correct data', testing_1.inject([testing_1.TestComponentBuilder], function (builder) {
            tcb = builder;
            tcb.createAsync(netattraction_1.Netattraction).then(function (fixture) {
                netattraction = fixture.componentInstance;
                var element = fixture.nativeElement;
                var target = element.querySelectorAll('.table.netattraction');
                fixture.detectChanges(); //trigger change detection
                expect(1).toEqual(1);
            })
                .catch(function (e) {
                var output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('netattraction error: ');
                console.log(output);
            });
        }));
        it('Should render a netattraction table', testing_1.inject([testing_1.TestComponentBuilder], function (builder) {
            tcb = builder;
            tcb.createAsync(netattraction_1.Netattraction).then(function (fixture) {
                netattraction = fixture.componentInstance;
                var element = fixture.nativeElement;
                var target = element.querySelectorAll('.table.netattraction');
                fixture.detectChanges(); //trigger change detection
                expect(target.length).toBeGreaterThan(0);
                expect(target[0].nodeName).toBe('ION-GRID');
            })
                .catch(function (e) {
                var output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('netattraction error: ');
                console.log(output);
            });
        }));
    });
    describe('should fill out the table completely', function () {
        it('should be as many rows as concepts', testing_1.inject([testing_1.TestComponentBuilder], function (builder, done) {
            tcb = builder;
            //Need to create a dashboard, it will then create the chart
            tcb.createAsync(dashboard_1.Dashboard).then(function (fixture) {
                //Set Initial State
                var data = platform.getData();
                data.survey.id = '5';
                var _data = JSON.stringify(data);
                window.localStorage.setItem('project_data', _data);
                window.localStorage.setItem('project_id', '5');
                window.localStorage.setItem('cache_settings', 'true');
                dashboard = fixture.componentInstance;
                var _chart = window['App'].instances.chart;
                //Set Spies
                spyOn(_chart, 'composeChart').and.callThrough();
                spyOn(window['App'].instances.dashboard, 'dismissLoader');
                var element = fixture.nativeElement;
                var target = element.querySelectorAll('.table.netattraction ion-row');
                var rowCount = target.length - 1;
                var conceptCount = data.data.concepts.length;
                fixture.detectChanges(); //trigger change detection
                expect(rowCount).toEqual(conceptCount);
            })
                .catch(function (e) {
                var output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('chart draw error: ');
                console.log(output);
            });
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0YXR0cmFjdGlvbi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV0YXR0cmFjdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxxQkFBcUQsZUFBZSxDQUFDLENBQUE7QUFFckUsOEJBQXFELGVBQWUsQ0FBQyxDQUFBO0FBR3JFLGdDQUFxRCxzQkFBc0IsQ0FBQyxDQUFBO0FBQzVFLFFBQU8sU0FBUyxDQUFDLENBQUE7QUFFakIsOEJBQXFELGlCQUFpQixDQUFDLENBQUE7QUFDdkUsc0JBQXFELGlCQUFpQixDQUFDLENBQUE7QUFDdkUsMEJBQXFELHdCQUF3QixDQUFDLENBQUE7QUFDOUUsNkJBQXFELDJCQUEyQixDQUFDLENBQUE7QUFLakYsd0JBRXFELHVCQUF1QixDQUFDLENBQUE7QUFFN0Usa0JBQWtCO0FBQ2xCLHNCQUtPLFlBQVksQ0FBQyxDQUFBO0FBRXBCLElBQUksUUFBUSxDQUFDO0FBQ2IsSUFBSSxRQUFRLEdBQVcsSUFBSSxnQkFBUSxFQUFFLENBQUM7QUFDdEMsSUFBSSxHQUFHLENBQUM7QUFDUixJQUFJLFNBQVMsQ0FBQztBQUNkLElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxhQUFhLENBQUM7QUFDbEIsSUFBSSxJQUFJLENBQUM7QUFDVCxJQUFJLFdBQVcsQ0FBQztBQUNoQixJQUFJLE9BQU8sQ0FBQztBQUNaLElBQUksVUFBVSxDQUFDO0FBRWYsa0JBQWtCO0FBQ2xCLFFBQVEsQ0FBQyxlQUFlLEVBQUU7SUFDdEIsVUFBVSxDQUFDO1FBQ1Asc0JBQVksQ0FBQztZQUNULEVBQUUsT0FBTyxFQUFFLHdCQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFTLEVBQUU7WUFDMUMsRUFBRSxPQUFPLEVBQUUsV0FBSSxFQUFFLFFBQVEsRUFBRSxnQkFBUSxFQUFFO1lBQ3JDLEVBQUUsT0FBTyxFQUFFLDZCQUFhLEVBQUUsUUFBUSxFQUFFLGVBQU8sRUFBRTtZQUM3QyxFQUFFLE9BQU8sRUFBRSwwQkFBVyxF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