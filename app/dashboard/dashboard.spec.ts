
//Import Angular
import { Injectable }                      from '@angular/core';
import { Http }                            from '@angular/http';

import { Alert, NavController }            from 'ionic-angular';

import { Observable }                      from 'rxjs/Observable';
import { BehaviorSubject }                 from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { Dashboard }                       from './dashboard';
import { DataService }                     from './data.service'
import { App }                             from './../globals';

//Import Testing Stuff
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,} from '@angular/platform-browser-dynamic/testing';
import { addProviders, 
        inject, 
        TestComponentBuilder }               from '@angular/core/testing';

//Mock Setup Stuff
import { 
    MockClass, 
    HttpMock, 
    NavMock,
    MockDataService
} from './../mocks';


let dataService         = null;
let mockDataService     = null;
let dataServiceSpy      = null;
let dashSpy             = null;

let httpMock:any        = new HttpMock();
let navMock             = null;

let tcb;
let observable          = null;

//Our parent block
describe('Dashboard', () => {
    var platform:any;

    beforeEach(() => {
      addProviders([
        {provide: Http, useClass: HttpMock},
        {provide: NavController, useClass: NavMock},
        {provide: DataService, useClass: DataService}
      ])

      //SET MOCKS
      window['App']    = new App();
      navMock          = new NavMock();
      platform         = new MockClass();

      //Set Initial State
      window.localStorage.setItem('project_data', platform.getData());
      window.localStorage.setItem('project_id', '5');

      observable       = new BehaviorSubject(platform.getData());
      observable.next();

      dataService      = new DataService(httpMock);
      mockDataService  = new MockDataService(httpMock);

      //dashboard        = new Dashboard(navMock, dataService);
    });

    afterEach(() => {
        window['App'].activeRequests = 0;
        window.localStorage.clear();
    });

    describe('Dashboard', () => {
        it('Initial State is good', () => {
            let dashboard   = new Dashboard(navMock, dataService);
            let App         = window['App'];
            let i           = App.instances;

            //Assert Initial State
            expect(typeof App).toBe('object');
            expect(typeof i).toBe('object');
            expect(typeof i.dashboard).toBe('object');
            
            //Assert SUT
            expect(dashboard).toBeTruthy();
            expect(dashboard).not.toEqual(null);
        });

        //Specs not getting executed
        it('Dashboard.init', inject([TestComponentBuilder], (builder) => { 
           tcb = builder;

           return tcb.createAsync(Dashboard).then(fixture => {
                let dashboard = fixture.componentInstance.valueOf();
                spyOn(dashboard, 'init'); //.and.callThrough();
                
                dashboard.init();
                //fixture.detectChanges(); //trigger change detection
                
                let callCount = dashboard.init.calls.all().length;
                //console.log('callCount: ', callCount);

                expect(callCount).toBe(1);
                expect(dashboard.init).toHaveBeenCalledTimes(1);
            })
            .catch(e => {
              console.log('error: ');
              console.log(e.stack)
            });
        }));

        //Specs not getting executed
        it('Dashboard Fetches Data', inject([TestComponentBuilder], (builder) => { 
           tcb = builder;

           return tcb.createAsync(Dashboard).then(fixture => {
                let dashboard = fixture.componentInstance;
                spyOn(dashboard.dataService, 'fetchData').and.returnValue(observable);

                dashboard.init();
                
                expect(dashboard.dataService.fetchData).toHaveBeenCalled();
            })
            .catch(e => { 
              console.log('error: ');
              console.log(e.stack)
            });
        }));
    });
});