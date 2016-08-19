
import { Component, EventEmitter, Output }   	from '@angular/core';

import {Http, HTTP_PROVIDERS}     				from '@angular/http';
import { NavController, Loading } 				from 'ionic-angular';
import 'rxjs/Rx';

import { App } 					          		from './../globals';
window['App'] = new App();

import { Chart }       							from '../charts/chart';
import { ChartService }             			from '../charts/chart.service'


//TODO: Make this the main component - aka remove the main componenet and have this as the top level component.

@Component({
  selector: 'dashboard',
  directives: [Chart],
  templateUrl: 'build/dashboard/dashboard.html',
  providers: [HTTP_PROVIDERS, ChartService],
  output: ['data', 'dataEvent'],
})

export class Dashboard {
	public data: Object;

	constructor(private navController: NavController, public http: Http, public chartService: ChartService){
		console.log('Dashboard Constructed');
	    console.log(this.chartService);

		//Show the modal and store it as a promise on the window
	  	window['App'].loading = Loading.create({
	      content: "Loading...",
	      duration: 0,
	      dismissOnPageChange: false
	    });

	    var _data = this.chartService.fetchData(window.localStorage.getItem('project_data'));

	    this.navController.present(window['App'].loading);

	    var project_id = localStorage.getItem('project_id');
	    this.loadCharts(project_id);
	}

	loadCharts(pid){
	    var observable = this.http.get('http://www.intengoresearch.com/dash/projects/' + pid).map( (resp) => {
	        return resp.json();
	      }).subscribe(resp => {
	        console.log('Project specific data came back: ');

	        this.data = resp;
	        window.localStorage.setItem('project_data', JSON.stringify(resp));
	        window['App'].loading.dismiss();
	      });
  	}
}
