
import { Component, enableProdMode }      from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar }      from 'ionic-native';

import { App }            from './globals';

import { DataService }    from './dashboard/data.service'

import { LoginPage }      from './pages/login/login';
import { TabsPage }       from './pages/tabs/tabs';

enableProdMode();

//TODO: make sure this doesnt break native
let Cordova: any;

//,providers: [DataService]
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [HTTP_PROVIDERS, DataService]
})

export class MyApp {
  private rootPage:any;
  public  cache_settings: any = null;

  constructor(private platform: Platform) {
    window['App'] = new App();
   
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(typeof Cordova == 'undefined') document.querySelectorAll('body')[0].classList.add('browser');
      if(typeof Cordova !== 'undefined') StatusBar.styleDefault();
      
      var cache_settings = localStorage.getItem('cache_data');
      var remember_me    = window.localStorage.getItem('remember_me');
      
      if(remember_me == 'true') {
        this.rootPage   = TabsPage;
      } else {
        window.localStorage.clear();
        this.rootPage   = LoginPage;
      }
    });
  }
}


ionicBootstrap(MyApp)
