
import { Component }                from '@angular/core'
import { Platform }                 from 'ionic-angular';

import { HomePage }                 from '../home/home';
import { SettingsPage }             from '../settings/settings';

import { DataService }              from '../../dashboard/data.service'
//import { Dashboard }  from '../../dashboard/dashboard';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
  outputs: ['data']
})

export class TabsPage {
  private tab1Root: 	  any;
  private tab2Root: 	  any;
  private currentTab: 	any;

  constructor(public dataService: DataService) {
    window['App'].instances.tabsPage = this;
    //console.log('TabsPage:constructor');

    // this tells the tabs component which Pages
    // should be each tab's root Page
    var currentTab  = window.localStorage.getItem('cache_settings');
    	  currentTab  = (currentTab !== null) ? 0 : 1;

    this.currentTab = currentTab;
    this.tab1Root 	= HomePage;
    this.tab2Root 	= SettingsPage;
  }

  //TODO: When you click the dashboard page and you have changed studies load the data from the new study
  initDash(){
    console.log('TabsPage:initDash');

    var project_id = this.dataService.getProjectId();
    var data_cache = this.dataService.getData(true);
    
    if(this.dataService.studiesDidChange(project_id, data_cache)){
      //reload data
      //console.log('Reloading The Data From Web Service');
      window.localStorage.removeItem('project_data');
      
      this.dataService.removeCharts();
      this.dataService.reloadCharts();
    } else {
      console.log('Displaying the dash with cache');
    }
  }
}
