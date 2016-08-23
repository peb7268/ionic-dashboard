
import { Component } 	          from '@angular/core';
import { NavController }          from 'ionic-angular';

import {Http, HTTP_PROVIDERS}     from '@angular/http';

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
