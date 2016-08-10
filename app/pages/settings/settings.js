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
var SettingsPage = (function () {
    function SettingsPage(platform, nav) {
        this.platform = platform;
        this.nav = nav;
    }
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
                        console.log('Cancel clicked');
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