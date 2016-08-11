
import { Component, EventEmitter, Output }   from '@angular/core';
import {Http, HTTP_PROVIDERS}                from '@angular/http';
//import { bootstrap } from 'angular2/platform/browser';
import 'rxjs/Rx';
import { Chart }                             from '../charts/chart';

//TODO: Make this the main component - aka remove the main componenet and have this as the top level component.

@Component({
  selector: 'dashboard',
  providers: [HTTP_PROVIDERS],
  output: ['data', 'dataEvent'],
  directives: [Chart],
  templateUrl: 'build/dashboard/dashboard.html' 
})

export class Dashboard {
  

  constructor(public http: Http){}

  ngOnInit(){}
}
