import {Component} from '@angular/core'
import {Platform} from 'ionic-angular';

import {HomePage} from '../home/home';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {

  private tab1Root: 	any;
  private tab2Root: 	any;
  private currentTab: 	any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    var currentTab  = window.localStorage.getItem('cache_settings');
    	currentTab  = (currentTab !== null) ? 0 : 1;

    this.currentTab = currentTab;
    this.tab1Root 	= HomePage;
    this.tab2Root 	= SettingsPage;
  }
}
