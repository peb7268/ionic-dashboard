
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

let settingsPage:any;
let tcb;

//Our parent block
xdescribe('SettingsPage', () => {
    beforeEach(() => {
        addProviders([
            { provide: Platform, 
              useClass: MockClass  
            },
            { provide: NavController, 
              useClass: NavMock  
            },
        ]);
    });
	
    describe('Component Creation', () => {
        it('Should render the settings page', inject([TestComponentBuilder], (builder) => { 
           tcb = builder;
           tcb.createAsync(SettingsPage).then(fixture => {
                settingsPage = fixture.componentInstance;
                let element  = fixture.nativeElement;
                
                let text = element.querySelectorAll('.dash-settings')[0].innerText.toLowerCase();
                
                //fixture.detectChanges(); //trigger change detection
                
                expect(text).toBe('dash settings');
            })
            .catch(e => console.log(e.stack));
        }));

        it('Should have default values', inject([TestComponentBuilder], (builder) => { 
           tcb = builder;
           tcb.createAsync(SettingsPage).then(fixture => {
                settingsPage = fixture.componentInstance;
                let element  = fixture.nativeElement;
                
                expect(settingsPage.project_id).toBe(0);
            })
            .catch(e => console.log(e.stack));
        }));
    })
});