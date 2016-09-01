
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

let dataService         = null;
let httpService:any     = new HttpMock();

//Our parent block
describe('DataService', () => {
    var platform:any;

    beforeEach(() => {
      addProviders([
            {provide: Http, useClass: HttpMock}
      ])
      platform     = new MockClass();
      dataService  = new DataService(httpService);
    });

    afterEach(() => {
        window['App'].activeRequests = 0;
        window.localStorage.clear();
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

    describe('Should know if cached project mathes current project', () =>{
        //For when the user selects a new study
        it('should return false if the cached project doesnt match the project being fetched', () =>{
            var mockData         = platform.getData();
            var isCurrentProject = dataService.isCurrentProject(mockData.survey.id, 20);

            expect(isCurrentProject).toBeFalsy();
        });

        it('should return true if the cached project matches the project being fetched', () =>{
            var mockData         = platform.getData();
            var isCurrentProject = dataService.isCurrentProject(mockData.survey.id, '5');

            expect(isCurrentProject).toBeTruthy();
        });
    });

    describe('Should know if there is a data fetch in progress', () => {
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

        it('Should return an observable with cached data if useCachedData is true', () => {
            var mockData = JSON.stringify(platform.getData());
            window.localStorage.setItem('cache_settings', 'true');

            window['App'].activeRequests = 0;

            var result   = dataService.fetchData(mockData);

            expect(typeof result).toBe('object');
            expect(result.constructor.name).toBe('SubjectObservable');
            expect(typeof result.source.hasCompleted).toBe('boolean');

            expect(typeof result.source.value).toBe('object');
            expect(typeof result.source.value.data).toBe('object');
            expect(typeof result.source.value.data.completes).toBe('number');
            expect(typeof result.source.value.survey.id).toBe('string');
        });

        it('Should make a request to the source for the data, increment the active requests, and return an observable', () => {
            var mockData     = JSON.stringify(platform.getData());
            var project_id   = JSON.parse(mockData).survey.id;

            window.localStorage.clear();
            window['App'].activeRequests = 0;

            expect(window['App'].activeRequests).toEqual(0);

            var result   = dataService.fetchData(mockData, project_id);

            expect(window['App'].activeRequests).toEqual(1);
            expect(typeof result).toBe('object');
            expect(result.constructor.name).toBe('Observable');
        });
    });

    describe('Should be able to store data', () => {
        it('can store an object', () => {
            var data;

            expect(window.localStorage.getItem('project_data')).toBeNull();

            var obj = {
                name: 'Paul',
                hobby: 'code'
            }
            dataService.storeData(obj);

            data = window.localStorage.getItem('project_data');
            
            expect(data).toBeDefined();
            expect(typeof data).toBe('string');

            data = JSON.parse(data);
            expect(data.name.toLowerCase()).toEqual('paul');
            expect(data.hobby.toLowerCase()).toEqual('code');
        });
    });

    describe('Should have a data getter', () => {
        it('should get data from an internal propery', () => {
            var mockData = JSON.stringify(platform.getData());
            var data:any;

            window.localStorage.setItem('cache_settings', 'true');

            window['App'].activeRequests = 0;

            var result   = dataService.fetchData(mockData);
            result.subscribe(res => {
                dataService.data = res;
            });

            data = dataService.getData();
            
            expect(data).toBeDefined();
            expect(typeof data).toBe('object');

            expect(dataService.data).toBeDefined();
            expect(typeof dataService.data).toBe('object');
        });

        it('should get data from a cached value', () => {
            var mockData = JSON.stringify(platform.getData());
            var data:any;

            window.localStorage.setItem('cache_settings', 'true');

            window['App'].activeRequests = 0;

            var result   = dataService.fetchData(mockData);
            result.subscribe(res => {
                dataService.data = res;
            });

            data = dataService.getData(true);
            
            expect(data).toBeDefined();
            expect(typeof data).toBe('object');
        });
    });
});