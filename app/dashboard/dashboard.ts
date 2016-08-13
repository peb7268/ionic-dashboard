
import { Component }   from '@angular/core';
import { Chart }       from '../charts/chart';

//TODO: Make this the main component - aka remove the main componenet and have this as the top level component.

@Component({
  selector: 'dashboard',
  directives: [Chart],
  templateUrl: 'build/dashboard/dashboard.html' 
})

export class Dashboard {}
