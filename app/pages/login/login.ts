
import {Component} from '@angular/core'
import {NgModel} from '@angular/common'
import {Platform, NavController} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  public user: any = {};
  constructor(public platform: Platform, public nav: NavController) {}

  login(evt){
  	evt.preventDefault();
  	var username = this.user.username.trim().toLowerCase();
  	var password = this.user.password.trim().toLowerCase();

  	var auth = (username == 'peb7268' && password == 'erford7268') ? true : false;

  	if(auth == true) this.nav.push(TabsPage);
  }
}
