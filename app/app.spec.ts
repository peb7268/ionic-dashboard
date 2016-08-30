
//Import Angular
import { Component }                from '@angular/core';
import { HTTP_PROVIDERS }           from '@angular/http';

import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar}                 from 'ionic-native';

import { MyApp }                    from './app';
import { TabsPage }                 from './pages/tabs/tabs';
import { LoginPage }                from './pages/login/login';
import { DataService }              from './dashboard/data.service'

//Import Testing Stuff
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,} from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders }     from '@angular/core/testing';
import { MockClass }                from './mocks';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);


//So TS doesnt freak
declare var require: any
declare var describe: any
declare var expect: any
declare var it: any

//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';


let myApp = null;

//Our parent block
describe('App', () => {
    beforeEach(() => {
      let platform = (<any>new MockClass());
      myApp = new MyApp(platform);
    });
	
    describe('App Initialize', () => {
    	it('App component', () => {
    		var cache_settings = myApp.cache_settings;
    		expect(cache_settings).toBeNull();
    	});
    });
});