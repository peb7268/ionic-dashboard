
import { Component, Input, Output, EventEmitter }   from '@angular/core';

import { NavController, Loading } 					from 'ionic-angular';

import { Chart }       								from '../charts/chart';
import { Netattraction }       						from '../tables/netattraction';
import { DataService }   							from '../dashboard/data.service'

import { Observable }								from 'rxjs/Observable';

import { HttpMock, MockDataService }     			from '../mocks';

//TODO: Finish error handinling

@Component({
  selector: 'dashboard',
  directives: [Chart, Netattraction],

  providers: [ 
  	HttpMock,
  	MockDataService,
  	DataService	
  ],

  templateUrl: 'build/dashboard/dashboard.html',

  inputs:  ['data'],
  outputs: ['dataEvent']
})

export class Dashboard {
	public data: any;
	public caught: any;

	constructor(private nav: NavController, public dataService: DataService){
		window['App'].instances.dashboard = this;
	}

	init(){ 
		this.data 		= null;

		var dataService = this.dataService;
		var project_id 	= localStorage.getItem('project_id');

		this.presentLoader(window['App']);
		
	  	var observable  = this.dataService.fetchData(window.localStorage.getItem('project_data'), project_id)
		.subscribe( resp => {
			//console.log('Dashboard:initializeDashboard observable subscription firing');
			// this.dataService.dataSubject.next(resp);
			this.data = resp;
			this.dataService.delegateData(project_id, this.data);
		});
	}

	ngOnInit(){
		//console.log('Dashboard:init');
		this.init();
	}

	ngOnChanges(changes:any):void {
    	console.log('Dashboard:ngOnChanges: this.data: ', this.data);
  	}

	presentLoader(App){
		App.loading = Loading.create({
	      content: "Loading...",
	      duration: 0,
	      dismissOnPageChange: false
	    });

	  	this.nav.present(App.loading);
	}

	dismissLoader(timer){
	    //console.log('Dashboard:dismissLoader');
	    window.setTimeout(function(){
	      window.dispatchEvent(new Event('resize'));
	      var self = window['App'].instances.dashboard;
	      window['App'].loading.dismiss();
	    }, timer);
 	}
}
