
//Import Angular
import {Component} from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';

import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from '../../app/pages/tabs/tabs';
import {LoginPage} from '../../app/pages/login/login';

//Import Testing Stuff
import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, 
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
} from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';

//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

declare var require: any
declare var describe: any
declare var expect: any
declare var it: any


//Our parent block
describe('App', () => {
    //beforeEach((done) => {});
	
    describe('Initial Test', () => {
    	it('should be on', () => {
    		var one = 2;
    		expect(typeof one).toBe('number');
    	});
    });
});