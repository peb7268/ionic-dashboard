
//Import Angular
import { Injectable }                        from '@angular/core';

import {Platform, ActionSheet, NavController}from 'ionic-angular';

import { LoginPage }                         from '../login/login';
import { TabsPage }                          from '../tabs/tabs';
import { HomePage }                          from '../home/home';
import { SettingsPage }                      from './settings';


//Import Testing Stuff
import { TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,} from '@angular/platform-browser-dynamic/testing';
import { addProviders, 
        inject, 
        TestComponentBuilder }               from '@angular/core/testing';

import { MockClass, NavMock, HttpMock }      from './../../mocks';



//So TS doesnt freak
declare var require: any
declare var describe: any
declare var expect: any
declare var it: any

let settingsPage:any;
let tcb;

//Our parent block
describe('SettingsPage', () => {
    beforeEach(() => {
        addProviders([
            { provide: Platform, 
              useClass: MockClass  
            },
            { provide: NavController, 
              useClass: NavMock  
            },
        ])
    });
	
    it('Should render the settings page', inject([TestComponentBuilder], (_tcb) => { 
       tcb = _tcb;
       return tcb.createAsync(SettingsPage).then(fixture => {
            let settingsPage = fixture.componentInstance, 
            element = fixture.nativeElement;
            
            debugger;
            //fixture.detectChanges(); //trigger change detection
            
            expect(element.querySelector('h1').innerText).toBe('Hello World!');
        })
        .catch(e => console.log(e));
    }))
});