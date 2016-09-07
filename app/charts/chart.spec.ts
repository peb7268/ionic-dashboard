
//Import Angular
import { Injectable }                           from '@angular/core';
import { Http }                                 from '@angular/http';

import {Platform, ActionSheet, NavController }  from 'ionic-angular';

import { Observable }                           from 'rxjs/Observable';
import { BehaviorSubject }                      from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { Chart }                                from './chart';
import { DataService }                          from '../dashboard/data.service'
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

let tcb;
let chart;

//Our parent block
describe('Chart', () => {
    beforeEach(() => {
        addProviders([
            { provide: Platform, 
              useClass: MockClass  
            },
            { provide: Http, 
              useClass: HttpMock  
            },
            { provide: DataService, 
              useClass: MockDataService
            },
        ]);
    });
	
    describe('Chart Creation', () => {
        it('Should render a chart', inject([TestComponentBuilder], (builder) => { 
           tcb = builder;
           tcb.createAsync(Chart).then(fixture => {
                chart = fixture.componentInstance;
                let element  = fixture.nativeElement;
                
                let text = element.querySelectorAll('.dash-settings')[0].innerText.toLowerCase();
                console.log('text: ' + text);

                fixture.detectChanges(); //trigger change detection
                
                expect(text).toBe('dash settings');
            })
            .catch(e => {
                console.log('chart error: ');
                console.log(e.stack)
            });
        }));
    })
});