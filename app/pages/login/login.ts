
import { Platform, NavController, Toast}            from 'ionic-angular';

import { Component, EventEmitter, Output }          from '@angular/core'
import { NgModel }                                  from '@angular/common'
import { Http, Headers}                             from '@angular/http';

import { DataService }                              from '../../dashboard/data.service'

import 'rxjs/Rx';

import { TabsPage }     from '../tabs/tabs';
import { ProjectsPage } from '../projects/projects';

declare var samsung:any;

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  public user: any  = {};
  public creds: any = {};
  public data: Object;
  
  constructor(public platform: Platform, public nav: NavController, public http: Http, public dataService: DataService){
    console.log('LoginPage:constructor', http);
    
    window['App'].instances.loginPage = this;

    platform.ready().then(() => {
      // if(typeof samsung !== 'undefined'){
      //   samsung.spass.initializeSpass(this.bootStrapAuth, this.errorCallback);
      //   samsung.spass.isFeatureEnabled(0, this.fingerprintEnabled, this.errorCallback);
      //   samsung.spass.initializeSpassFingerprint(this.presentFingerprintDialog, this.errorCallback);
      //   samsung.spass.startIdentifyWithDialog (true, this.authSuccess, this.authError);
      // }
    });
  }

  login(evt){
  	evt.preventDefault();
    if(evt.type == 'keyup' && evt.keyCode !== 13) return;
    
    var remember_me = (typeof this.user.remember_me !== 'undefined') ? this.user.remember_me.toString() : 'false';
    window.localStorage.setItem('remember_me', remember_me);

    var endpoint = window.localStorage.getItem('endpoint');

  	this.user.username = this.user.username.trim().toLowerCase();
  	this.user.password = this.user.password.trim().toLowerCase();
  	this.creds = {
      'username'  : this.user.username,
      'password'  : this.user.password 
    };
    var creds  = JSON.stringify(this.creds);

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');    
    endpoint = (endpoint === null || typeof endpoint == 'undefined') ? 'http://intengodev.com' : endpoint;

    //endpoint = 'http://dev.intengodev.com';  //Uncomment for testing
    var observable = this.http.post(endpoint + '/dash/login', {'credentials' : creds }).map( (resp) => {
      if(resp.text() == 'error') {
        this.showLoginError();
        //this.destination.next({})
        return false;
      }

      return resp.json();
    }).subscribe(resp => {
      if(resp.authed == true){
        window.localStorage.setItem('admin', resp.isAdmin);
        window.localStorage.setItem('credentials', JSON.stringify(this.creds));

        this.data = resp.project_list;
        window.localStorage.setItem('projects', JSON.stringify(this.data));
        window['App'].instances.loginPage.nav.push(TabsPage);  //Push to tabs page once request is successful
      } else {
        //throw a login error message
        this.showLoginError();
      }
    });      
   }

   showLoginError(){
        let toast = Toast.create({
          message: 'There was an error logging in. Please try again.',
          position: 'bottom',
          duration: 5000
          // showCloseButton: true,
          // cssClass: 'toast-error'
        });
     
        toast.onDismiss(() => {
          console.log('Dismissed toast');
        });
     
        this.nav.present(toast);
   }

  bootStrapAuth(msg){
    alert(msg);
    //alert('Fingerprint bootstrapped');
  }

  fingerprintEnabled(){
    //alert('Fingerprint enabled');
  }

  presentFingerprintDialog(){
    //alert('Presenting fingerprint dialog');
  }

  authSuccess(status){
    alert(status.state);

    if(status.state == 'ON_FINISHED'){
      alert('auth finished');
      
      alert(typeof window['App'].instances.loginPage.nav);
      alert(typeof TabsPage);
      
      window['App'].instances.loginPage.nav.push(TabsPage);
      return false;
    }
  }

  authError(status){
    alert('auth error');
  }

  errorCallback(){
    alert('Fingerprint not working');
  }
}
