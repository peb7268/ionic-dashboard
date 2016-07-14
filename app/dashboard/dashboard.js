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
var http_1 = require('@angular/http');
//import { bootstrap } from 'angular2/platform/browser';
require('rxjs/Rx');
var chart_1 = require('../charts/chart');
//TODO: Make this the main component - aka remove the main componenet and have this as the top level component.
var Dashboard = (function () {
    function Dashboard(http) {
        var _this = this;
        this.http = http;
        var observable = this.http.get('http://marketpa3pne.intengoresearch.com/dashboard/chart').map(function (resp) {
            return resp.json();
        }).subscribe(function (resp) { return _this.data = resp; });
    }
    Dashboard.prototype.ngOnInit = function () { };
    Dashboard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            providers: [http_1.HTTP_PROVIDERS],
            output: ['data', 'dataEvent'],
            directives: [chart_1.Chart],
            templateUrl: 'build/dashboard/dashboard.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
