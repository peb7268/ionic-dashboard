
import { Component }      from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar }      from 'ionic-native';

import { App }            from './globals';

import { TabsPage }       from './pages/tabs/tabs';
import { LoginPage }      from './pages/login/login';

import { DataService }    from './dashboard/data.service'

//TODO: make sure this doesnt break native
let Cordova: any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [DataService]
})

export class MyApp {
  private rootPage:any;
  public  cache_settings: any = null;

  constructor(private platform: Platform) {
    window['App'] = new App();
   
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(typeof Cordova !== 'undefined') StatusBar.styleDefault();

      this.cache_settings = localStorage.getItem('cache_settings');
      if(this.cache_settings === null){
        localStorage.clear();
        this.rootPage   = LoginPage;
      } else {
        this.rootPage   = TabsPage;
      }
    });
  }
}


ionicBootstrap(MyApp, [DataService])
