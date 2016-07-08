import {Component} 				from '@angular/core';
import {NavController, Loading} from 'ionic-angular';

import {Dashboard} 				from '../../dashboard/dashboard';
import { Chart } 				from '../../charts/chart';

import { App } 					from '../../globals';
window['App'] 					= new App();

@Component({
	templateUrl: 'build/pages/home/home.html',
	directives: [Dashboard, Chart]
})

export class HomePage {
  constructor(private navController: NavController) {

  	window['App'].loading = Loading.create({
      content: "Loading...",
      duration: 0,
      dismissOnPageChange: false
    });
    
    this.navController.present(window['App'].loading);
  }
}
