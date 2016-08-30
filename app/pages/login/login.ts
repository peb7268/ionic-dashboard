
import { Platform, NavController }         from 'ionic-angular';

import { Component, EventEmitter, Output } from '@angular/core'
import { NgModel }                         from '@angular/common'
import { Http, Headers}                    from '@angular/http';

import 'rxjs/Rx';

import { TabsPage } from '../tabs/tabs';

declare var samsung:any;

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  public user: any = {};
  public data: Object;

  constructor(public platform: Platform, public nav: NavController, public http: Http){
    window['App'].instances.loginPage = this;

    platform.ready().then(() => {
      if(typeof samsung !== 'undefined'){
        samsung.spass.initializeSpass(this.bootStrapAuth, this.errorCallback);
        samsung.spass.isFeatureEnabled(0, this.fingerprintEnabled, this.errorCallback);
        samsung.spass.initializeSpassFingerprint(this.presentFingerprintDialog, this.errorCallback);
        samsung.spass.startIdentifyWithDialog (true, this.authSuccess, this.authError);
      }
    });
  }

  login(evt){
  	evt.preventDefault();

  	var username = this.user.username.trim().toLowerCase();
  	var password = this.user.password.trim().toLowerCase();
  	var auth = (username == 'peb7268@gmail.com' && password == 'testpass') ? true : false;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');


  	if(auth == true) {
      var creds     = JSON.stringify({'username' : username, 'password' : password });
      window.localStorage.setItem('credentials', creds);

      //www.intengoresearch
      //market7qvnra.
      var observable = this.http.post('http://www.intengoresearch.com/dash/login', {'credentials' : creds }).map( (resp) => {
        return resp.json();
      }).subscribe(resp => {
        this.data = resp;
        window.localStorage.setItem('projects', JSON.stringify(resp));
        window['App'].instances.loginPage.nav.push(TabsPage);  //Push to tabs page once request is successful
      });      
    }
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
