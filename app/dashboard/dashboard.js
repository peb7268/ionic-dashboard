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
//TODO: Finish error handinling
var Dashboard = (function () {
    function Dashboard(nav, dataService) {
        this.nav = nav;
        this.dataService = dataService;
        console.log('Dashboard:constructor');
        window['App'].instances.dashboard = this;
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
        this.presentLoader(window['App']);
        var observable = this.dataService.fetchData(window.localStorage.getItem('project_data'), project_id)
            .subscribe(function (resp) {
            console.log('observable subscription firing');
            // this.dataService.dataSubject.next(resp);
            _this.data = resp;
            _this.dataService.delegateData(project_id, _this.data);
        });
    };
    Dashboard.prototype.presentLoader = function (App) {
        App.loading = ionic_angular_1.Loading.create({
            content: "Loading...",
            duration: 0,
            dismissOnPageChange: false
        });
        this.nav.present(App.loading);
    };
    Dashboard.prototype.dismissLoader = function (timer) {
        console.log('Dashboard:dismissLoader');
        window.setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
            var self = window['App'].instances.dashboard;
            window['App'].loading.dismiss();
        }, timer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFBeUQsZUFBZSxDQUFDLENBQUE7QUFFekUsOEJBQTRDLGVBQWUsQ0FBQyxDQUFBO0FBRTVELHNCQUFvQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RELDZCQUFxQywyQkFFckMsQ0FBQyxDQUYrRDtBQUloRSwrQkFBK0I7QUFXL0I7SUFJQyxtQkFBb0IsR0FBa0IsRUFBUyxXQUF3QjtRQUFuRCxRQUFHLEdBQUgsR0FBRyxDQUFlO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXJDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsK0JBQVcsR0FBWCxVQUFZLE9BQVc7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVILHlEQUF5RDtJQUN6RCx1Q0FBbUIsR0FBbkI7UUFBQSxpQkFtQkM7UUFsQkEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBRTdDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxLQUFLLEdBQUssS0FBSyxDQUFDO1FBRXBCLCtCQUErQjtRQUMvQixJQUFJLFVBQVUsR0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFaEMsSUFBSSxVQUFVLEdBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsVUFBVSxDQUFDO2FBQ3RHLFNBQVMsQ0FBRSxVQUFBLElBQUk7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDOUMsMkNBQTJDO1lBQzNDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsaUNBQWEsR0FBYixVQUFjLEdBQUc7UUFDaEIsR0FBRyxDQUFDLE9BQU8sR0FBRyx1QkFBTyxDQUFDLE1BQU0sQ0FBQztZQUN4QixPQUFPLEVBQUUsWUFBWTtZQUNyQixRQUFRLEVBQUUsQ0FBQztZQUNYLG1CQUFtQixFQUFFLEtBQUs7U0FDM0IsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQ0FBYSxHQUFiLFVBQWMsS0FBSztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNiLENBQUM7SUEvREg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsVUFBVSxFQUFFLENBQUMsYUFBSyxDQUFDO1lBQ25CLFdBQVcsRUFBRSxnQ0FBZ0M7WUFFN0MsTUFBTSxFQUFHLENBQUMsTUFBTSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN2QixDQUFDOztpQkFBQTtJQXlERixnQkFBQztBQUFELENBQUMsQUF2REQsSUF1REM7QUF2RFksaUJBQVMsWUF1RHJCLENBQUEifQ==