
//Import Angular
import { Injectable }                      from '@angular/core';
import { Http }                            from '@angular/http';

import { Alert }                           from 'ionic-angular';

import { Observable }                      from 'rxjs/Observable';
import { BehaviorSubject }                 from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { SettingsPage }                    from '../pages/settings/settings';
import { DataService }                     from './data.service'

//Import Testing Stuff
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,} from '@angular/platform-browser-dynamic/testing';
import { addProviders }                    from '@angular/core/testing';

//Mock Setup Stuff
import { MockClass }                       from './../mocks';
import { HttpMock }                        from './../mocks';

let dataService = null;
let httpService:any    = new HttpMock();

//Our parent block
describe('DataService', () => {
    beforeEach(() => {
      addProviders([
            {provide: Http, useClass: HttpMock}
      ])
      let platform = (<any>new MockClass());
      dataService = new DataService(httpService);
    });

    describe('DataService Initialize', () => {
        it('App is attatched to the window', () => {
            let App = window['App'];
            let i   = App.instances;
            let ds  = i.dataService;

            expect(typeof App).toBe('object');
            expect(typeof i).toBe('object');
            expect(typeof ds).toBe('object');
        });

    	it('Attatches the dataService to the window correctly', () => {
    		let ds = window['App'].instances.dataService;
            expect(typeof window['App']).toBe('object');
            expect(typeof window['App'].instances).toBe('object');
    		expect(typeof ds).toBe('object');
    	});

        it('Has the correct page instances', () => {
            expect(typeof dataService.SettingsPage).toBe('function'); 
        });

        it('returns an observable for the data', () => {
            expect(typeof dataService.dataSubject).toBe('object');
        });
    });

    describe('Can tell if there is a data fetch in progress', () => {
        it('returns true if App.activeRequests is > 0', () => {
            window['App'].activeRequests = 1;
            var dataFetchInProgress = dataService.dataFetchInProgress();

            expect(dataFetchInProgress).toBeTruthy();
        });

        it('returns false if App.activeRequests is == 0', () => {
            window['App'].activeRequests = 0;
            var dataFetchInProgress = dataService.dataFetchInProgress();

            expect(dataFetchInProgress).toBeFalsy();
        });
    });

    describe('Should know how to switch between live data stream or cache', () => {
        it('should use cached data if provided a json string and cache is set to true', () => {
            var data          = "{\"data\": \"im some data\"}";
            var should_cache  = 'true';
 
            var use_cache     = dataService.useCachedData(data, should_cache);

            expect(use_cache).toBeTruthy();
        });

        it('should not use cached data if should cache is false', () => {
            var data          = "{\"data\": \"im some data\"}";
            var should_cache  = 'false';
 
            var use_cache     = dataService.useCachedData(data, should_cache);

            expect(use_cache).toBeFalsy();
        });

        it('should not use cached data if data is null', () => {
            var data          = null;
            var should_cache  = 'true';
 
            var use_cache     = dataService.useCachedData(data, should_cache);

            expect(use_cache).toBeFalsy();

        });

        it('should not use cached data if data is undefined', () => {
            var data;
            var should_cache  = 'true';
 
            var use_cache     = dataService.useCachedData(data, should_cache);

            expect(use_cache).toBeFalsy();
        });
    });

    describe('Should Fetch Data', () => {
        it('should return a blank observable if there is a data fetch in progress', () => {
            window['App'].activeRequests = 1;
            window['App'].instances = {
                dashboard: {
                    dismissLoader: function(timer){}
                }
            }
            var result = dataService.fetchData();
            expect(typeof result).toBe('object');
            expect(typeof result.source.hasCompleted).toBe('boolean');
        });

        xit('Should return cached data if useCachedData is true', () => {

        });
    });
});