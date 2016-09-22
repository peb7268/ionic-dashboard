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
        this.creds = null;
        this.projects = [];
        this.project = {};
        this.project_id = 0;
        var creds = window.localStorage.getItem('credentials');
        var projects = window.localStorage.getItem('projects');
        var project_id = window.localStorage.getItem('project_id');
        var cache_settings = window.localStorage.getItem('cache_settings');
        window['App'].instances.settingsPage = this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBQzFDLDhDQUE4QztBQUU5Qyw4QkFBbUQsZUFBZSxDQUFDLENBQUE7QUFFbkUsc0JBQTBCLGdCQUFnQixDQUFDLENBQUE7QUFRM0M7SUFNRSxzQkFBbUIsUUFBa0IsRUFBUyxHQUFrQjtRQUE3QyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBZTtRQUx4RCxVQUFLLEdBQWEsSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQVEsQ0FBQyxDQUFDO1FBRzFCLElBQUksS0FBSyxHQUFjLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxHQUFXLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELElBQUksVUFBVSxHQUFTLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLElBQUksY0FBYyxHQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFckUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUksSUFBSSxDQUFDO1FBRTdDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sVUFBVSxLQUFLLFdBQVcsSUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDbkgsRUFBRSxDQUFBLENBQUMsT0FBTyxjQUFjLEtBQUssV0FBVyxJQUFJLGNBQWMsS0FBSyxJQUFJLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFFL0ksRUFBRSxDQUFBLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDO1lBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLEVBQUUsQ0FBQSxDQUFDLE9BQU8sUUFBUSxLQUFLLFdBQVcsQ0FBQztZQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQscUNBQWMsR0FBZCxVQUFlLEdBQUc7UUFDaEIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXJCLGlCQUFpQjtRQUNqQixFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssV0FBVyxDQUFDO1lBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RyxFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsS0FBSyxJQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV0SixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0UsSUFBSSxXQUFXLEdBQUcsMkJBQVcsQ0FBQyxNQUFNLENBQUM7WUFDbkMsS0FBSyxFQUFFLGVBQWU7WUFDdEIsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUk7b0JBQy9DLE9BQU8sRUFBRTt3QkFDUCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFTLENBQUMsQ0FBQztvQkFDM0QsQ0FBQztpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQXRESDtRQUFDLGdCQUFTLENBQUM7WUFDVCxXQUFXLEVBQUUsb0NBQW9DO1NBQ2xELENBQUM7O29CQUFBO0lBcURGLG1CQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQztBQW5EWSxvQkFBWSxlQW1EeEIsQ0FBQSJ9