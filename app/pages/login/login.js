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
var ionic_angular_1 = require('ionic-angular');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var tabs_1 = require('../tabs/tabs');
var LoginPage = (function () {
    function LoginPage(platform, nav, http) {
        var _this = this;
        this.platform = platform;
        this.nav = nav;
        this.http = http;
        this.user = {};
        window['App'].instances.loginPage = this;
        platform.ready().then(function () {
            if (typeof samsung !== 'undefined') {
                samsung.spass.initializeSpass(_this.bootStrapAuth, _this.errorCallback);
                samsung.spass.isFeatureEnabled(0, _this.fingerprintEnabled, _this.errorCallback);
                samsung.spass.initializeSpassFingerprint(_this.presentFingerprintDialog, _this.errorCallback);
                samsung.spass.startIdentifyWithDialog(true, _this.authSuccess, _this.authError);
            }
        });
    }
    LoginPage.prototype.login = function (evt) {
        var _this = this;
        evt.preventDefault();
        var username = this.user.username.trim().toLowerCase();
        var password = this.user.password.trim().toLowerCase();
        var auth = (username == 'peb7268@gmail.com' && password == 'testpass') ? true : false;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if (auth == true) {
            var creds = JSON.stringify({ 'username': username, 'password': password });
            window.localStorage.setItem('credentials', creds);
            //www.intengoresearch
            //market7qvnra.
            var observable = this.http.post('http://www.intengoresearch.com/dash/login', { 'credentials': creds }).map(function (resp) {
                return resp.json();
            }).subscribe(function (resp) {
                _this.data = resp;
                window.localStorage.setItem('projects', JSON.stringify(resp));
                window['App'].instances.loginPage.nav.push(tabs_1.TabsPage); //Push to tabs page once request is successful
            });
        }
    };
    LoginPage.prototype.bootStrapAuth = function (msg) {
        alert(msg);
        //alert('Fingerprint bootstrapped');
    };
    LoginPage.prototype.fingerprintEnabled = function () {
        //alert('Fingerprint enabled');
    };
    LoginPage.prototype.presentFingerprintDialog = function () {
        //alert('Presenting fingerprint dialog');
    };
    LoginPage.prototype.authSuccess = function (status) {
        alert(status.state);
        if (status.state == 'ON_FINISHED') {
            alert('auth finished');
            alert(typeof window['App'].instances.loginPage.nav);
            alert(typeof tabs_1.TabsPage);
            window['App'].instances.loginPage.nav.push(tabs_1.TabsPage);
            return false;
        }
    };
    LoginPage.prototype.authError = function (status) {
        alert('auth error');
    };
    LoginPage.prototype.errorCallback = function () {
        alert('Fingerprint not working');
    };
    LoginPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/login/login.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform, ionic_angular_1.NavController, http_1.Http])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.js.map