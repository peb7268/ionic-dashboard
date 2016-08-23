
import { Component } 	          from '@angular/core';
import { NavController }          from 'ionic-angular';

import { Http }     from '@angular/http';

// import { ChartService }   		  from '../../charts/chart.service'
import { Dashboard } 			  from '../../dashboard/dashboard';

@Component({
	templateUrl: 'build/pages/home/home.html',
	directives: [Dashboard]
})

export class HomePage {

  constructor() {
    console.log('Home Page Constructor');
  }
}
