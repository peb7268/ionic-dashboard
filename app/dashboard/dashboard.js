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
var chart_1 = require('../charts/chart');
var data_service_1 = require('../dashboard/data.service');
//TODO: Make this the main component - aka remove the main componenet and have this as the top level component.
var Dashboard = (function () {
    function Dashboard(navController, dataService) {
        this.navController = navController;
        this.dataService = dataService;
        this.pet = 'cat';
        console.log('Dashboard:constructor');
        this.dataService.instances['Dashboard'] = this;
        this.initializeDashboard();
    }
    Dashboard.prototype.ngOnChanges = function (changes) {
        console.log('Dashboard:ngOnChanges: this.data: ', this.data);
    };
    //TODO: Use an observable instead of a timeout / callback
    Dashboard.prototype.initializeDashboard = function () {
        var _this = this;
        this.data = null;
        console.log('Dashboard:initializeDashboard');
        var dataService = this.dataService;
        var _data = 'cat';
        //window['App'].klass   = this;
        var project_id = localStorage.getItem('project_id');
        //Show the modal and store it as a promise on the window
        window['App'].loading = ionic_angular_1.Loading.create({
            content: "Loading...",
            duration: 0,
            dismissOnPageChange: false
        });
        this.navController.present(window['App'].loading);
        var observable = this.dataService.fetchData(window.localStorage.getItem('project_data'), project_id)
            .subscribe(function (resp) {
            console.log('observable subscription firing');
            // this.dataService.dataSubject.next(resp);
            _this.data = resp;
            _this.dataService.delegateData(project_id, _this.data);
        });
    };
    Dashboard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [chart_1.Chart],
            templateUrl: 'build/dashboard/dashboard.html',
            inputs: ['data'],
            outputs: ['dataEvent']
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, data_service_1.DataService])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.js.map