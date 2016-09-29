
import { Component } from '@angular/core';

import {Platform, ActionSheet, NavController} from 'ionic-angular';

import { App }         from '../../globals';
import { LoginPage }   from '../login/login';
import { TabsPage }    from '../tabs/tabs';
import { HomePage }    from '../home/home';

import { DataService } from '../../dashboard/data.service'

import { Http }        from '@angular/http';


@Component({
  templateUrl: 'build/pages/settings/settings.html'
})

export class SettingsPage {
  private creds:any       = null;
  public  projects:any    = [];
  public  project:any     = {};
  public  project_id:any  = 0;
  public  admin           = false;
  public  endpoint:string = 'http://www.intengoresearch.com';

  constructor(public platform: Platform, public nav: NavController, public dataService: DataService ) {
    console.log('SettingsPage:constructor');

    var creds            = window.localStorage.getItem('credentials');
    var projects         = window.localStorage.getItem('projects');
    var project_id       = window.localStorage.getItem('project_id');
    
    var cache_data       = window.localStorage.getItem('cache_data');
    var remember_project = window.localStorage.getItem('remember_project');

    var isAdmin          = window.localStorage.getItem('admin');
    this.admin           = (isAdmin == 'false') ? false : true;

    window['App'].instances.settingsPage  = this;
    
    if(typeof cache_data !== 'undefined' && project_id !== null && project_id.length > 0) this.project_id         = project_id;
    if(typeof cache_data !== 'undefined' && cache_data !== null && cache_data.length > 0) this.project.cache_data = cache_data;
    
    if(typeof creds !== 'undefined')    this.creds = JSON.parse(creds);
    if(typeof projects !== 'undefined') this.projects = JSON.parse(projects);
  }

  saveSelections(evt){
    evt.preventDefault();

    //Save project id
    if(typeof this.project_id !== 'undefined') window.localStorage.setItem('project_id', this.project_id);
    if(typeof this.project.cache_data !== 'undefined' && this.project.cache_data === true ) window.localStorage.setItem('cache_data', 'true');
    if(typeof this.endpoint !== 'undefined') window.localStorage.setItem('endpoint', JSON.stringify(this.endpoint));

    //Send to dash page
    this.nav.parent.select(0);
  }

  openMenu() {
    let actionSheet = ActionSheet.create({
      title: 'Quick Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Logout',
          role: 'logout', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            window.localStorage.clear();
            var nav = window['App'].instances.settingsPage.nav;
            window['App'].instances.settingsPage.dataService.removeCharts();
            window['App'].instances.settingsPage.dataService.resetData();
           
            delete window['App']

            window['App'] = new App();
            nav.push(LoginPage);
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }
}
