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
var dashboard_1 = require('../../dashboard/dashboard');
var chart_1 = require('../../charts/chart');
var globals_1 = require('../../globals');
window['App'] = new globals_1.App();
var HomePage = (function () {
    function HomePage(navController) {
        this.navController = navController;
        window['App'].loading = ionic_angular_1.Loading.create({
            content: "Loading...",
            duration: 0,
            dismissOnPageChange: false
        });
        this.navController.present(window['App'].loading);
    }
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html',
            directives: [dashboard_1.Dashboard, chart_1.Chart]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
