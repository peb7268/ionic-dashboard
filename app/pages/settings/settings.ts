import {Component} from '@angular/core';
import {Platform, ActionSheet, NavController} from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage }  from '../home/home';

@Component({
  templateUrl: 'build/pages/settings/settings.html'
})

export class SettingsPage {
  private creds:any;
  public  projects: any;
  public  project: any;

  constructor(public platform: Platform, public nav: NavController) {
    var creds    = window.localStorage.getItem('credentials');
    var projects = window.localStorage.getItem('projects');
    this.project = {};
    
    if(typeof creds !== 'undefined')    this.creds = JSON.parse(creds);
    if(typeof projects !== 'undefined') this.projects = JSON.parse(projects);
  }

  saveSelections(evt){
    evt.preventDefault();
    //Save project id
    debugger;

    //Send to dash page
    window['App'].klass.nav.push(HomePage);
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
