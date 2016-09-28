
import { Component, Input, Output, EventEmitter }   from '@angular/core';

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
  	MockDataService
  ],

  templateUrl: 'build/dashboard/dashboard.html',

  inputs:  ['data'],
  outputs: ['dataEvent']
})

export class Dashboard {
	public data: any;
	public caught: any;

	constructor(public dataService: DataService){
		console.log('Dashboard:constructor');

		window['App'].instances.dashboard = this;
	}

	init(){ 
		console.log('dashboard:init');
		this.data 		= null;

		var dataService = this.dataService;
		var project_id 	= localStorage.getItem('project_id');

		var loadingPromise = this.dataService.presentLoader(window['App']);
		loadingPromise.then(() => {
			var observable  = this.dataService.fetchData(window.localStorage.getItem('project_data'), project_id)
			.subscribe( resp => {
				this.data = resp;
				this.dataService.delegateData(project_id, this.data);
			});
		});
	}

	ngOnInit(){
		//console.log('Dashboard:init');
		//this.init();
	}

	ngOnChanges(changes:any):void {
    	console.log('Dashboard:ngOnChanges: this.data: ', this.data);
  	}
}
