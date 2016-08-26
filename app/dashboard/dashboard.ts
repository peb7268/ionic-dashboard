
import { Component, Input, Output, EventEmitter }   from '@angular/core';

import { NavController, Loading } 					from 'ionic-angular';

import { App } 					          			from './../globals';
window['App'] = new App();

import { Chart }       								from '../charts/chart';
import { DataService }   							from '../dashboard/data.service'


//TODO: Make this the main component - aka remove the main componenet and have this as the top level component.

@Component({
  selector: 'dashboard',
  directives: [Chart],
  templateUrl: 'build/dashboard/dashboard.html',

  inputs:  ['data'],
  outputs: ['dataEvent']
})

export class Dashboard {
	public data: any;
	public pet = 'cat';

	constructor(private navController: NavController, public dataService: DataService){
		console.log('Dashboard:constructor');

		this.dataService.instances['Dashboard'] = this;
		this.initializeDashboard();
	}

	ngOnChanges(changes:any):void {
    	console.log('Dashboard:ngOnChanges: this.data: ', this.data);
  	}

	//TODO: Use an observable instead of a timeout / callback
	initializeDashboard(){
		this.data = null;
		console.log('Dashboard:initializeDashboard');

		var dataService = this.dataService;
		var	_data 		= 'cat';

		window['App'].klass   = this;
		var project_id 		  = localStorage.getItem('project_id');

		//Show the modal and store it as a promise on the window
	  	window['App'].loading = Loading.create({
	      content: "Loading...",
	      duration: 0,
	      dismissOnPageChange: false
	    });
	  	this.navController.present(window['App'].loading);

	  	var observable  = this.dataService.fetchData(window.localStorage.getItem('project_data'), project_id)
		.subscribe( resp => {
			console.log('observable subscription firing');
			// this.dataService.dataSubject.next(resp);
			this.data = resp;
			this.dataService.delegateData(project_id, this.data);
		});
	}
}
