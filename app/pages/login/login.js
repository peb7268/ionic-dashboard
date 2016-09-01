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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsOEJBQWdELGVBQWUsQ0FBQyxDQUFBO0FBRWhFLHFCQUFnRCxlQUNoRCxDQUFDLENBRDhEO0FBRS9ELHFCQUFnRCxlQUFlLENBQUMsQ0FBQTtBQUVoRSxRQUFPLFNBQVMsQ0FBQyxDQUFBO0FBRWpCLHFCQUF5QixjQUFjLENBQUMsQ0FBQTtBQVF4QztJQUlFLG1CQUFtQixRQUFrQixFQUFTLEdBQWtCLEVBQVMsSUFBVTtRQUpyRixpQkE4RUM7UUExRW9CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFlO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUg1RSxTQUFJLEdBQVEsRUFBRSxDQUFDO1FBSXBCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV6QyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFBLENBQUM7Z0JBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN0RSxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMvRSxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEtBQUksQ0FBQyx3QkFBd0IsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzVGLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSSxD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