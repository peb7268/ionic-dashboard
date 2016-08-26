
import { Component }      from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar }      from 'ionic-native';

import { TabsPage }       from './pages/tabs/tabs';
import { LoginPage }      from './pages/login/login';

import { DataService }    from './dashboard/data.service'


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [DataService]
})

export class MyApp {
  private rootPage:any;

  constructor(private platform: Platform) {
    console.log('app:constructor');
    
    var cache_settings = localStorage.getItem('cache_settings');
    if(cache_settings === null){
      localStorage.clear();
      this.rootPage   = LoginPage;
    } else {
      this.rootPage   = TabsPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}


ionicBootstrap(MyApp, [DataService])
