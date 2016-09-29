
import { Component }                from '@angular/core'
import { Platform }                 from 'ionic-angular';

import { ProjectsPage }             from '../projects/projects';
import { HomePage }                 from '../home/home';
import { SettingsPage }             from '../settings/settings';

import { DataService }              from './../../dashboard/data.service'

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
  outputs: ['data']
})

export class TabsPage {
  private tab1Root: 	  any;
  private tab2Root: 	  any;
  private tab3Root:     any;
  private currentTab: 	any;

  constructor(public dataService: DataService) {
    console.log('TabsPage:constructor');

    window['App'].instances.tabsPage = this;    

    // this tells the tabs component which Pages
    // should be each tab's root Page
    var currentTab  = window.localStorage.getItem('cache_data');
    currentTab      = (currentTab !== null) ? 1 : 0;

    this.currentTab = currentTab;

    this.tab1Root   = ProjectsPage;
    this.tab2Root 	= HomePage;
    this.tab3Root 	= SettingsPage;
  }

  initDash(){
    console.log('TabsPage:initDash');

    var project_id = this.dataService.getProjectId();
    var data_cache = this.dataService.getData(true);
    var studiesChanged = this.dataService.studiesDidChange(project_id, data_cache);
    console.log('studies changed: ', studiesChanged);

    if(studiesChanged == true){
      console.log('reloading project data cache');
      window.localStorage.removeItem('project_data');
      this.dataService.removeCharts();

      this.dataService.reloadCharts();
    } else {
      console.log('Displaying the dash with cache');
      this.dataService.reloadCharts();
    }
  }

  initProjects(){
    console.log('TabsPage:initProjects');
    var input:any = document.querySelectorAll('.project_filter input');
    if(input.length > 0){
      input[0].focus();
    }
  }
}
