import {Component} from '@angular/core';
import {Platform, ActionSheet, NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/settings/settings.html'
})

export class SettingsPage {
  private creds:any;
  public  projects: any;

  constructor(public platform: Platform, public nav: NavController) {
    var creds    = window.localStorage.getItem('credentials');
    var projects = window.localStorage.getItem('projects');

    if(typeof creds !== 'undefined')    this.creds = JSON.parse(creds);
    if(typeof projects !== 'undefined') this.projects = JSON.parse(projects);
    
    this.populateCredentialFields(creds);
    this.populateAllowedProjects(creds);
  }

  populateCredentialFields(creds){
    //Fill out the form fields with the user creds
  }

  populateAllowedProjects(creds){
    //Grab the project list from local storage and populate the allowed projects list
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
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }
}
