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
core_1.enableProdMode();
//TODO: make sure this doesnt break native
var Cordova;
var MyApp = (function () {
    function MyApp(platform) {
        var _this = this;
        this.platform = platform;
        this.cache_settings = null;
        window['App'] = new globals_1.App();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (typeof Cordova !== 'undefined')
                ionic_native_1.StatusBar.styleDefault();
            _this.cache_settings = localStorage.getItem('cache_settings');
            if (_this.cache_settings === null) {
                window.localStorage.clear();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFBK0MsZUFBZSxDQUFDLENBQUE7QUFHL0QsOEJBQXlDLGVBQWUsQ0FBQyxDQUFBO0FBQ3pELDZCQUErQixjQUFjLENBQUMsQ0FBQTtBQUU5Qyx3QkFBK0IsV0FBVyxDQUFDLENBQUE7QUFFM0MscUJBQStCLG1CQUFtQixDQUFDLENBQUE7QUFDbkQsc0JBQStCLHFCQUFxQixDQUFDLENBQUE7QUFFckQsNkJBQStCLDBCQUUvQixDQUFDLENBRndEO0FBRXpELHFCQUFjLEVBQUUsQ0FBQztBQUVqQiwwQ0FBMEM7QUFDMUMsSUFBSSxPQUFZLENBQUM7QUFPakI7SUFJRSxlQUFvQixRQUFrQjtRQUp4QyxpQkFxQkM7UUFqQnFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFGOUIsbUJBQWMsR0FBUSxJQUFJLENBQUM7UUFHakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUM7UUFFMUIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQztZQUNwQixnRUFBZ0U7WUFDaEUsaUVBQWlFO1lBQ2pFLEVBQUUsQ0FBQSxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQztnQkFBQyx3QkFBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRTVELEtBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzdELEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLFFBQVEsR0FBSyxpQkFBUyxDQUFDO1lBQzlCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsUUFBUSxHQUFLLGVBQVEsQ0FBQztZQUM3QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBekJIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1Q0FBdUM7WUFDakQsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztTQUN6QixDQUFDOzthQUFBO0lBdUJGLFlBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDO0FBckJZLGFBQUssUUFxQmpCLENBQUE7QUFHRCw4QkFBYyxDQUFDLEtBQUssRUFBRSxDQUFDLDBCQUFXLENBQUMsQ0FBQyxDQUFBIn0=