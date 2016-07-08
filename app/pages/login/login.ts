import {Component} from '@angular/core'
import {Platform} from 'ionic-angular';

import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  private tab1Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
  }
}
