
//Import Angular
import { Component }                from '@angular/core';
import { HTTP_PROVIDERS }           from '@angular/http';

import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar}                 from 'ionic-native';

import { MyApp }                    from './app';
import { App   }                    from './globals';
import { TabsPage }                 from './pages/tabs/tabs';
import { LoginPage }                from './pages/login/login';
import { DataService }              from './dashboard/data.service'

//Import Testing Stuff
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,} from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders }     from '@angular/core/testing';
import { MockClass }                from './mocks';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

window['App'] = new App();
let myApp     = null;

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

    xdescribe('Should update metrics when studies are changed', () => {
        it('should update the netattraction chart when a new study is selected', () => {
            expect(1).toEqual(2);
        })
    });
});