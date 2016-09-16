

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
	  	this.data = this.data.data;
	  	this.setNetAttraction(this.data);
  	}
  }

  getConceptId(idx, concept){
  	return concept.id;
  }

  setNetAttraction(data){
  	var concepts   = data.concepts;
  	var best_count = data.best_count_per_concept;

  	for(var idx in best_count){
  		var netattraction = best_count[idx] - Math.abs(data.worst_count_per_concept[idx]); //82
  		
  		for(var cidx = 0; cidx < concepts.length; cidx++){
  			var concept = concepts[cidx];
  			if(concept.id == idx) concept.netattraction = netattraction;
  		}
  	}

  	this.data.concepts = concepts;
  }
}

