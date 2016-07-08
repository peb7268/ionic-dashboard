
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

  	var auth = (this.user.username == 'peb7268' && this.user.password == 'erford7268') ? true : false;
  	if(auth == true) this.nav.push(TabsPage);
  }
}
