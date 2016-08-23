
import { Component, EventEmitter, Output }   	from '@angular/core';

import { NavController, Loading } 				from 'ionic-angular';

import { App } 					          		from './../globals';
window['App'] = new App();

import { Chart }       							from '../charts/chart';
import { ChartService }             			from '../charts/chart.service'


//TODO: Make this the main component - aka remove the main componenet and have this as the top level component.

@Component({
  selector: 'dashboard',
  directives: [Chart],
  templateUrl: 'build/dashboard/dashboard.html',
  providers: [ChartService],
  output: ['data', 'dataEvent'],
})

export class Dashboard {
	public data: Object;

	constructor(private navController: NavController, public chartService: ChartService){
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

	  	var _data = this.chartService.fetchData(window.localStorage.getItem('project_data'));
	    this.initializeDashboard(_data.data, project_id);
	}

	initializeDashboard(data, project_id){
	    var _shouldStoreData = this.shouldStoreData(data, project_id);
	    console.log('Should Store Data?: ' + _shouldStoreData);

	    this.chartService.fetchData(data, project_id);
	}

	shouldStoreData(data, project_id){
		return (this.chartService.dataIsValid(data) && this.chartService.isCurrentProject(project_id, data.survey.id));
	}
}
