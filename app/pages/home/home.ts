
import { Component } 	          from '@angular/core';
import { NavController }          from 'ionic-angular';

import { Http }     from '@angular/http';

import { Dashboard } 			  from '../../dashboard/dashboard';

@Component({
	templateUrl: 'build/pages/home/home.html',
	directives: [Dashboard],
	inputs: ['data']
})

export class HomePage {
  public data: Object = {};

  constructor() {
    console.log('Home Page Constructor');
  }
}
