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
// import { NgModel }   from '@angular/common'
var ionic_angular_1 = require('ionic-angular');
var login_1 = require('../login/login');
var SettingsPage = (function () {
    function SettingsPage(platform, nav) {
        this.platform = platform;
        this.nav = nav;
        console.log('settings constructor');
        var creds = window.localStorage.getItem('credentials');
        var projects = window.localStorage.getItem('projects');
        var project_id = window.localStorage.getItem('project_id');
        var cache_settings = window.localStorage.getItem('cache_settings');
        window['App'].instances.settingsPage = this;
        this.project = {};
        if (typeof project_id !== 'undefined' && project_id !== null && project_id.length > 0)
            this.project_id = project_id;
        if (typeof cache_settings !== 'undefined' && cache_settings !== null && cache_settings.length > 0)
            this.project.cache_settings = cache_settings;
        if (typeof creds !== 'undefined')
            this.creds = JSON.parse(creds);
        if (typeof projects !== 'undefined')
            this.projects = JSON.parse(projects);
    }
    SettingsPage.prototype.saveSelections = function (evt) {
        evt.preventDefault();
        //Save project id
        if (typeof this.project_id !== 'undefined')
            window.localStorage.setItem('project_id', this.project_id);
        if (typeof this.project.cache_settings !== 'undefined' && this.project.cache_settings === true)
            window.localStorage.setItem('cache_settings', 'true');
        //Send to dash page
        this.nav.parent.select(0);
    };
    SettingsPage.prototype.openMenu = function () {
        var actionSheet = ionic_angular_1.ActionSheet.create({
            title: 'Quick Actions',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Share',
                    icon: !this.platform.is('ios') ? 'share' : null,
                    handler: function () {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Remember',
                    icon: !this.platform.is('ios') ? 'heart-outline' : null,
                    handler: function () {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Logout',
                    role: 'logout',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        window.localStorage.clear();
                        window['App'].instances.settingsPage.nav.push(login_1.LoginPage);
                    }
                }
            ]
        });
        this.nav.present(actionSheet);
    };
    SettingsPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/settings/settings.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform, ionic_angular_1.NavController])
    ], SettingsPage);
    return SettingsPage;
}());
exports.SettingsPage = SettingsPage;
//# sourceMappingURL=settings.js.map