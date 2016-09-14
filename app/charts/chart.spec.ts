
//Import Angular
import { Injectable, Inject }                   from '@angular/core';
import { Http }                                 from '@angular/http';

import {Platform, ActionSheet, NavController }  from 'ionic-angular';

import { Observable }                           from 'rxjs/Observable';
import { BehaviorSubject }                      from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { Chart }                                from './chart';
import { Dashboard }                            from '../dashboard/dashboard';
import { DataService }                          from '../dashboard/data.service';
import { App }                                  from './../globals';

//Import Testing Stuff
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,} from '@angular/platform-browser-dynamic/testing';
import { addProviders, 
        inject, 
        TestComponentBuilder }                  from '@angular/core/testing';

//Mock Setup Stuff
import { 
    MockClass, 
    HttpMock, 
    NavMock,
    MockDataService
} from './../mocks';

let platform;
let httpMock:any     = new HttpMock();
let tcb;
let dashboard;
let chart;
let dataService;
let navMock;
let observable;

//Our parent block
describe('Chart', () => {
    beforeEach(() => {
        addProviders([
            { provide: Platform, useClass: MockClass },
            { provide: Http, useClass: HttpMock },
            { provide: NavController, useClass: NavMock },
            { provide: DataService, useClass: MockDataService },
        ]);
 
        platform      = new MockClass();
        navMock       = new NavMock();
        window.localStorage.setItem('project_data', JSON.stringify(platform.getData()));

        var data      = platform.getData();
        var _data     = JSON.stringify(data);

        //Set Initial State
        window.localStorage.setItem('project_data', _data);
        window.localStorage.setItem('project_id', '5');

        observable    = new BehaviorSubject(data);
        observable.next(data);

        dataService   = new DataService(httpMock);
        spyOn(dataService, 'fetchData').and.returnValue(observable);

        chart         = new Chart(dataService);
    });

    afterEach(() => {
        //chart = null;
        window['App'].activeRequests = 0;
        window.localStorage.clear();
    });
	
    describe('Creation', () => {
        it('Should render a chart', inject([TestComponentBuilder], (builder) => { 
           tcb = builder;

           tcb.createAsync(Chart).then(fixture => {
                chart = fixture.componentInstance;
                let element  = fixture.nativeElement;
                let target   = element.querySelectorAll('.ct-chart');

                fixture.detectChanges(); //trigger change detection
                
                expect(target.length).toBeGreaterThan(0);
                expect(target[0].nodeName).toBe('DIV');
            })
            .catch(e => {
                let output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('chart error: ');
                console.log(output); 
            });
        }));
    });

    describe('Initial values are set', () => {
        it('should fetch it\'s own data', () => {
            var data  = chart.data;

            expect(typeof data).toBe('object');
            expect(data.survey.id).toBe('5');
        });

        it('sets a chart instance on the App object', () => {
            expect(typeof window['App'].instances.chart).toBe('object');
            expect(window['App'].instances.chart.constructor.name).toBe('Chart');
        });
    });

    describe('should draw the chart', () => {
        it('should draw the chart on ngChange', inject([TestComponentBuilder], (builder, done) => { 
           tcb = builder;
           //Need to create a dashboard, it will then create the chart
           tcb.createAsync(Dashboard).then(fixture => {
                //Set Initial State
                var data       = platform.getData();
                data.survey.id = '5';
                var _data      = JSON.stringify(data);

                window.localStorage.setItem('project_data', _data);
                window.localStorage.setItem('project_id', '5');
                window.localStorage.setItem('cache_settings', 'true');

                dashboard    = fixture.componentInstance;
                let _chart   = window['App'].instances.chart;

                //Set Spies
                spyOn(_chart, 'composeChart').and.callThrough();
                spyOn(window['App'].instances.dashboard, 'dismissLoader');

 
                let element  = fixture.nativeElement;
                let target   = element.querySelectorAll('.ct-chart');

                fixture.detectChanges(); //trigger change detection

                // console.log('spec running');
                //window['App'].instances.chart.events

                expect(_chart.composeChart).toHaveBeenCalled();
                expect(_chart.changed).toBeTruthy();
                expect(_chart.chartType).toBe('netattraction');
                expect(typeof _chart.dataService.charts['netattraction-5']).toBe('object');

                // done();
            })
            .catch(e => {
                let output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('chart draw error: ');
                console.log(output); 
            });
        }));

        it('should emit corresponding events upon creation', () => {
            //TODO: Implement Me
        });
    });
});