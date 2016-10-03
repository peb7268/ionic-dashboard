
import {Platform, NavController}  from 'ionic-angular';

import { Component } 	          from '@angular/core';

import { ProjectFilterPipe }      from './project_filter.ts';
import { DataService }   		  from '../../dashboard/data.service';

@Component({
	templateUrl: 'build/pages/projects/projects.html',
	directives: [],
	pipes: [ ProjectFilterPipe ],
	inputs: ['data', 'project_id']
})

export class ProjectsPage {
  public  data: Object 	  = {};
  public  projects:any 	  = [];
  public  project:any     = {};
  public  project_id:any  = 0;
  public  projectNameFilter:any;
  public  endpoint:string = 'http://www.intengoresearch.com';
  public  status          = 'closed';
  public  isAdmin         = false;

  constructor(public platform: Platform, public nav: NavController, public dataService: DataService ) {
    console.log('ProjectsPage:constructor');
    var projects         = window.localStorage.getItem('projects');
    var admin            = window.localStorage.getItem('admin');

    if(typeof projects !== 'undefined') this.projects = JSON.parse(projects);
    this.isAdmin = (typeof admin !== 'undefined' && admin != 'false') ? true : false;
  }

  /*
  UPDATE surveys SET surveys.completes = (SELECT count(*) FROM users WHERE users.survey_id = 277 AND users.completed = 1) WHERE id = 277;
  */
  ngAfterViewChecked(){
    //var input:any = document.querySelectorAll('.project_filter input');
    //input[0].focus();
  }

  selectProject(evt){
  	evt.preventDefault();
  	this.project_id = evt.target.parentElement.parentElement.getAttribute('project_id');
  	
  	window.localStorage.setItem('project_id', this.project_id);
  	
  	this.nav.parent.select(1);	//Switch to the second tab
  }
}
