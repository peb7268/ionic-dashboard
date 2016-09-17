"use strict";
var http_1 = require('@angular/http');
var ionic_angular_1 = require('ionic-angular');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/Rx');
var chart_1 = require('./chart');
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
var dataService;
var navMock;
var observable;
//Our parent block
describe('Chart', function () {
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
        var data = platform.getData();
        var _data = JSON.stringify(data);
        //Set Initial State
        window.localStorage.setItem('project_data', _data);
        window.localStorage.setItem('project_id', '5');
        observable = new BehaviorSubject_1.BehaviorSubject(data);
        observable.next(data);
        dataService = new data_service_1.DataService(httpMock);
        spyOn(dataService, 'fetchData').and.returnValue(observable);
        chart = new chart_1.Chart(dataService);
    });
    afterEach(function () {
        //chart = null;
        window['App'].activeRequests = 0;
        window.localStorage.clear();
    });
    describe('Creation', function () {
        it('Should render a chart', testing_1.inject([testing_1.TestComponentBuilder], function (builder) {
            tcb = builder;
            tcb.createAsync(chart_1.Chart).then(function (fixture) {
                chart = fixture.componentInstance;
                var element = fixture.nativeElement;
                var target = element.querySelectorAll('.ct-chart');
                fixture.detectChanges(); //trigger change detection
                expect(target.length).toBeGreaterThan(0);
                expect(target[0].nodeName).toBe('DIV');
            })
                .catch(function (e) {
                var output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('chart error: ');
                console.log(output);
            });
        }));
    });
    describe('Initial values are set', function () {
        it('should fetch it\'s own data', function () {
            var data = chart.data;
            expect(typeof data).toBe('object');
            expect(data.survey.id).toBe('5');
        });
        it('sets a chart instance on the App object', function () {
            expect(typeof window['App'].instances.chart).toBe('object');
            expect(window['App'].instances.chart.constructor.name).toBe('Chart');
        });
    });
    describe('should draw the chart', function () {
        it('should draw the chart on ngChange', testing_1.inject([testing_1.TestComponentBuilder], function (builder, done) {
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
                var target = element.querySelectorAll('.ct-chart');
                fixture.detectChanges(); //trigger change detection
                // console.log('spec running');
                //window['App'].instances.chart.events
                expect(_chart.composeChart).toHaveBeenCalled();
                expect(_chart.changed).toBeTruthy();
                expect(_chart.chartType).toBe('netattraction');
                expect(typeof _chart.dataService.charts['netattraction-5']).toBe('object');
                // done();
            })
                .catch(function (e) {
                var output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('chart draw error: ');
                console.log(output);
            });
        }));
        it('should emit corresponding events upon creation', function () {
            //TODO: Implement Me
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXJ0LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLHFCQUFxRCxlQUFlLENBQUMsQ0FBQTtBQUVyRSw4QkFBcUQsZUFBZSxDQUFDLENBQUE7QUFHckUsZ0NBQXFELHNCQUFzQixDQUFDLENBQUE7QUFDNUUsUUFBTyxTQUFTLENBQUMsQ0FBQTtBQUVqQixzQkFBcUQsU0FBUyxDQUFDLENBQUE7QUFDL0QsMEJBQXFELHdCQUF3QixDQUFDLENBQUE7QUFDOUUsNkJBQXFELDJCQUEyQixDQUFDLENBQUE7QUFLakYsd0JBRXFELHVCQUF1QixDQUFDLENBQUE7QUFFN0Usa0JBQWtCO0FBQ2xCLHNCQUtPLFlBQVksQ0FBQyxDQUFBO0FBRXBCLElBQUksUUFBUSxDQUFDO0FBQ2IsSUFBSSxRQUFRLEdBQVcsSUFBSSxnQkFBUSxFQUFFLENBQUM7QUFDdEMsSUFBSSxHQUFHLENBQUM7QUFDUixJQUFJLFNBQVMsQ0FBQztBQUNkLElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxXQUFXLENBQUM7QUFDaEIsSUFBSSxPQUFPLENBQUM7QUFDWixJQUFJLFVBQVUsQ0FBQztBQUVmLGtCQUFrQjtBQUNsQixRQUFRLENBQUMsT0FBTyxFQUFFO0lBQ2QsVUFBVSxDQUFDO1FBQ1Asc0JBQVksQ0FBQztZQUNULEVBQUUsT0FBTyxFQUFFLHdCQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFTLEVBQUU7WUFDMUMsRUFBRSxPQUFPLEVBQUUsV0FBSSxFQUFFLFFBQVEsRUFBRSxnQkFBUSxFQUFFO1lBQ3JDLEVBQUUsT0FBTyxFQUFFLDZCQUFhLEVBQUUsUUFBUSxFQUFFLGVBQU8sRUFBRTtZQUM3QyxFQUFFLE9BQU8sRUFBRSwwQkFBVyxFQUFFLFFBQVEsRUFBRSx1QkFBZSxFQUFFO1NBQ3RELENBQUMsQ0FBQztRQUVILFFBQVEsR0FBUSxJQUFJLGlCQUFTLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdB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