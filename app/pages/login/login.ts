
import { Platform, NavController } from 'ionic-angular';

import { Component, EventEmitter, Output } from '@angular/core'
import { NgModel } from '@angular/common'
import { Http, HTTP_PROVIDERS, Headers}                from '@angular/http';
import 'rxjs/Rx';


import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [HTTP_PROVIDERS]
})

export class LoginPage {
  public user: any = {};
  public data: Object;

  constructor(public platform: Platform, public nav: NavController, public http: Http){}

  login(evt){
  	evt.preventDefault();
    window['App'].klass = this;

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
        window['App'].klass.nav.push(TabsPage);  //Push to tabs page once request is successful
      });      
    }
  }
}
