

import { Component, Input, Output }   				from '@angular/core';
import { NavController, Loading }                   from 'ionic-angular';

import { DataService }                              from '../dashboard/data.service'
import { HttpMock, MockDataService }                from '../mocks';

//TODO: Figure out how to pass the data better using an observable and an event emitter
@Component({
  selector: 'netattraction',
  templateUrl: "build/tables/netattraction.html",
  providers: [
    MockDataService,
    DataService, 
    HttpMock
  ],
  inputs: 	 ['data']
})

export class Netattraction {
  public data:any = {
  	concepts: []
  };
  public netattraction:any = {};

  constructor(public dataService: DataService){
  	this.data = this.dataService.getData(true);
  }

  //Fires on init
  ngOnInit(){}
  ngOnChanges(changes:any):void{
  	if(typeof this.data == 'undefined') return;

  	if(this.data !== null && typeof this.data == 'object'){
      this.data.netattraction = this.data.netattraction;
	  	this.data = this.data;  	
  	}
  }

  getConceptId(idx, concept){
    let data = JSON.parse(window.localStorage.getItem('project_data'));
    let netattraction = data.netattraction;
    let i = 0;

    for(let prop in netattraction){
      debugger;
      if(idx == i) return prop.split('_')[1];
      i++;
    }
  }
}

