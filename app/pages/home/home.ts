
import { Component, EventEmitter, Output } 	from '@angular/core';
import { NavController, Loading } from 'ionic-angular';

import {Http, HTTP_PROVIDERS}     from '@angular/http';
import 'rxjs/Rx';

import { Dashboard } 			        from '../../dashboard/dashboard';
import { Chart } 				          from '../../charts/chart';

import { App } 					          from '../../globals';
window['App'] = new App();

@Component({
	templateUrl: 'build/pages/home/home.html',
	directives: [Dashboard, Chart],
  providers: [HTTP_PROVIDERS],
  output: ['data', 'dataEvent'],
})

export class HomePage {
  public data: Object;

  constructor(private navController: NavController, public http: Http) {

  	window['App'].loading = Loading.create({
      content: "Loading...",
      duration: 0,
      dismissOnPageChange: false
    });
    
    this.navController.present(window['App'].loading);

    var project_id = localStorage.getItem('project_id');
    this.loadCharts(project_id);
  }

  loadCharts(pid){
    var observable = this.http.get('http://www.intengoresearch.com/dash/projects/' + pid).map( (resp) => {
        return resp.json();
      }).subscribe(resp => {
        this.data = resp;
        window.localStorage.setItem('project_data', JSON.stringify(resp));
        window['App'].loading.dismiss();
      });
  }
}
