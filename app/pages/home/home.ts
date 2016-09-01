
import { Component } 	          from '@angular/core';

import { Dashboard } 			  from '../../dashboard/dashboard';

@Component({
	templateUrl: 'build/pages/home/home.html',
	directives: [Dashboard],
	inputs: ['data']
})

export class HomePage {
  public data: Object = {};

  constructor() {
    console.log('HomePage:constructor');
  }
}
