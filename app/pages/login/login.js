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
var tabs_1 = require('../tabs/tabs');
var LoginPage = (function () {
    function LoginPage(platform, nav) {
        this.platform = platform;
        this.nav = nav;
        this.user = {};
    }
    LoginPage.prototype.login = function (evt) {
        evt.preventDefault();
        var username = this.user.username.trim().toLowerCase();
        var password = this.user.password.trim().toLowerCase();
        var auth = (username == 'peb7268' && password == 'erford7268') ? true : false;
        if (auth == true)
            this.nav.push(tabs_1.TabsPage);
    };
    LoginPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/login/login.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform, ionic_angular_1.NavController])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
