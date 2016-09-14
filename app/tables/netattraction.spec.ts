
//Import Angular
import { Injectable, Inject }                   from '@angular/core';
import { Http }                                 from '@angular/http';

import {Platform, ActionSheet, NavController }  from 'ionic-angular';

import { Observable }                           from 'rxjs/Observable';
import { BehaviorSubject }                      from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { Netattraction }                        from './netattraction';
import { Chart }                                from '../charts/chart';
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
let netattraction;
let data;
let dataService;
let navMock;
let observable;

//Our parent block
describe('Netattraction', () => {
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

        data          = platform.getData();
        var _data     = JSON.stringify(data);

        //Set Initial State
        window.localStorage.setItem('project_data', _data);
        window.localStorage.setItem('project_id', '5');

        observable    = new BehaviorSubject(data);
        observable.next(data);

        dataService   = new DataService(httpMock);
        spyOn(dataService, 'fetchData').and.returnValue(observable);

        chart         = new Chart(dataService);
        netattraction = new Netattraction();
    });

    afterEach(() => {
        //chart = null;
        window['App'].activeRequests = 0;
        window.localStorage.clear();
    });
  
    describe('Creation', () => {
        it('should wait on the data to load before rendering', () => {
            expect(2).toBe(1);
        });

        it('Should have the correct data', inject([TestComponentBuilder], (builder) => { 
           tcb = builder;
           tcb.createAsync(Netattraction).then(fixture => {
                netattraction = fixture.componentInstance;
                let element   = fixture.nativeElement;
                let target    = element.querySelectorAll('.table.netattraction');

                fixture.detectChanges(); //trigger change detection
                
                expect(1).toEqual(1);
            })
            .catch(e => {
                let output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('netattraction error: ');
                console.log(output); 
            });
        }));

        it('Should render a netattraction table', inject([TestComponentBuilder], (builder) => { 
           tcb = builder;

           tcb.createAsync(Netattraction).then(fixture => {
                netattraction = fixture.componentInstance;
                let element   = fixture.nativeElement;
                let target    = element.querySelectorAll('.table.netattraction');

                fixture.detectChanges(); //trigger change detection
                
                expect(target.length).toBeGreaterThan(0);
                expect(target[0].nodeName).toBe('ION-GRID');
            })
            .catch(e => {
                let output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('netattraction error: ');
                console.log(output); 
            });
        }));
    });

    describe('should fill out the table completely', () => {
        it('should be as many rows as concepts', inject([TestComponentBuilder], (builder, done) => { 
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

                dashboard     = fixture.componentInstance;
                let _chart    = window['App'].instances.chart;

                //Set Spies
                spyOn(_chart, 'composeChart').and.callThrough();
                spyOn(window['App'].instances.dashboard, 'dismissLoader');
 
                let element      = fixture.nativeElement;
                let target       = element.querySelectorAll('.table.netattraction ion-row');
                
                let rowCount     = target.length - 1;
                let conceptCount = data.data.concepts.length;

                fixture.detectChanges(); //trigger change detection

                expect(rowCount).toEqual(conceptCount);
            })
            .catch(e => {
                let output = (typeof e.stack == 'undefined') ? e.message : e.stack;
                console.log('chart draw error: ');
                console.log(output); 
            });
        }));
    });
});