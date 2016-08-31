
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


import { MockClass }                       from './../mocks';
import { HttpMock }                        from './../mocks';


//So TS doesnt freak
declare var require: any
declare var describe: any
declare var expect: any
declare var it: any

//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

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
            expect(typeof ds).toBe('object');
    		expect(typeof ds).toBe('object');
    	});

        it('Has the correct page instances', () => {
            expect(typeof dataService.SettingsPage).toBe('function'); 
        });
    });
});