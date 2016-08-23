
import { Component, EventEmitter, Output }   	from '@angular/core';

import { NavController, Loading } 				from 'ionic-angular';

import { App } 					          		from './../globals';
window['App'] = new App();

import { Chart }       							from '../charts/chart';
import { DataService }   						from '../dashboard/data.service'


//TODO: Make this the main component - aka remove the main componenet and have this as the top level component.

@Component({
  selector: 'dashboard',
  directives: [Chart],
  templateUrl: 'build/dashboard/dashboard.html',
  output: ['data', 'dataEvent']
})

export class Dashboard {
	public data: Object;

	constructor(private navController: NavController, public dataService: DataService){
		console.log('Dashboard Constructed');

		window['App'].klass  = this;
		this.data 			 = {};
		var project_id 		 = localStorage.getItem('project_id');

		//Show the modal and store it as a promise on the window
	  	window['App'].loading = Loading.create({
	      content: "Loading...",
	      duration: 0,
	      dismissOnPageChange: false
	    });
	  	this.navController.present(window['App'].loading);

	  	var _data = this.dataService.fetchData(window.localStorage.getItem('project_data'));
	    this.initializeDashboard(_data.data, project_id, function(){
	    	console.log('dashboard intialized');
	    	window['App'].loading.dismiss();
	    	
	    	
	    });
	}

	initializeDashboard(data, project_id, callback){
	    var _shouldStoreData = this.shouldStoreData(data, project_id);
	    console.log('Should Store Data?: ' + _shouldStoreData);
	    this.data = data;

	    if(typeof callback !== 'undefined') {
	    	window.setTimeout(callback, 500);
	    }
	}

	shouldStoreData(data, project_id){
		return (this.dataService.dataIsValid(data) && this.dataService.isCurrentProject(project_id, data.survey.id));
	}
}
