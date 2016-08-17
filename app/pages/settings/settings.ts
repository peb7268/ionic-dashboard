import { Component } from '@angular/core';
// import { NgModel }   from '@angular/common'

import {Platform, ActionSheet, NavController} from 'ionic-angular';

import { LoginPage } from '../login/login';
import { TabsPage }  from '../tabs/tabs';
import { HomePage }  from '../home/home';

@Component({
  templateUrl: 'build/pages/settings/settings.html'
})

export class SettingsPage {
  private creds:any;
  public  projects: any;
  public  project: any;
  public  project_id: any;

  constructor(public platform: Platform, public nav: NavController) {
    var creds    = window.localStorage.getItem('credentials');
    var projects = window.localStorage.getItem('projects');
    this.project = {};
    
    if(typeof creds !== 'undefined')    this.creds = JSON.parse(creds);
    if(typeof projects !== 'undefined') this.projects = JSON.parse(projects);

    //641
  }

  saveSelections(evt){
    evt.preventDefault();

    //Save project id
    if(typeof this.project_id !== 'undefined') window.localStorage.setItem('project_id', this.project_id);
    if(typeof this.project.cache_settings !== 'undefined' && this.project.cache_settings === true ) window.localStorage.setItem('cache_settings', 'true');

    //Send to dash page
    this.nav.parent.select(0);
  }

  openMenu() {
    let actionSheet = ActionSheet.create({
      title: 'Quick Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Remember',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Logout',
          role: 'logout', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            window.localStorage.clear();
            window['App'].klass.nav.push(LoginPage);
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }
}
