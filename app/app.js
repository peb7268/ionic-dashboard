"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var globals_1 = require('./globals');
var tabs_1 = require('./pages/tabs/tabs');
var login_1 = require('./pages/login/login');
var data_service_1 = require('./dashboard/data.service');
var MyApp = (function () {
    function MyApp(platform) {
        var _this = this;
        this.platform = platform;
        console.log('app:constructor');
        window['App'] = new globals_1.App();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
            var cache_settings = localStorage.getItem('cache_settings');
            if (cache_settings === null) {
                localStorage.clear();
                _this.rootPage = login_1.LoginPage;
            }
            else {
                _this.rootPage = tabs_1.TabsPage;
            }
        });
    }
    MyApp = __decorate([
        core_1.Component({
            template: '<ion-nav [root]="rootPage"></ion-nav>',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform])
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
ionic_angular_1.ionicBootstrap(MyApp, [data_service_1.DataService]);
//# sourceMappingURL=app.js.map