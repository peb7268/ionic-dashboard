
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
	public data: Object = {};
	public dataEvent: any = new EventEmitter();

	constructor(private navController: NavController, public dataService: DataService){
		console.log('Dashboard Constructed');
		
		this.dataService.instances['Dashboard'] = this;
		this.initializeDashboard();
	}

	//TODO: Use an observable instead of a timeout / callback
	initializeDashboard(){
		window['App'].klass  = this;
		var project_id 		 = localStorage.getItem('project_id');

		//Show the modal and store it as a promise on the window
	  	window['App'].loading = Loading.create({
	      content: "Loading...",
	      duration: 0,
	      dismissOnPageChange: false
	    });
	  	this.navController.present(window['App'].loading);

	  	this.data = this.dataService.fetchData(window.localStorage.getItem('project_data'), project_id);

	    var _shouldStoreData = this.dataService.shouldStoreData(this.data, project_id);
	    console.log('Should Store Data?: ' + _shouldStoreData);
	    
    	window.setTimeout(function(){
	    	console.log('dashboard intialized');
	    	window['App'].loading.dismiss();
    	}, 500);
	}
}
