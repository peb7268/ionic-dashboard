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
var netattraction_1 = require('../tables/netattraction');
var data_service_1 = require('../dashboard/data.service');
var mocks_1 = require('../mocks');
//TODO: Finish error handinling
var Dashboard = (function () {
    function Dashboard(nav, dataService) {
        this.nav = nav;
        this.dataService = dataService;
        window['App'].instances.dashboard = this;
    }
    Dashboard.prototype.init = function () {
        var _this = this;
        this.data = null;
        var dataService = this.dataService;
        var project_id = localStorage.getItem('project_id');
        this.presentLoader(window['App']);
        var observable = this.dataService.fetchData(window.localStorage.getItem('project_data'), project_id)
            .subscribe(function (resp) {
            _this.data = resp;
            _this.dataService.delegateData(project_id, _this.data);
        });
    };
    Dashboard.prototype.ngOnInit = function () {
        //console.log('Dashboard:init');
        this.init();
    };
    Dashboard.prototype.ngOnChanges = function (changes) {
        console.log('Dashboard:ngOnChanges: this.data: ', this.data);
    };
    Dashboard.prototype.presentLoader = function (App) {
        console.log('presenting loader');
        this.nav.present(this.dataService.loading);
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
            directives: [chart_1.Chart, netattraction_1.Netattraction],
            providers: [
                mocks_1.HttpMock,
                mocks_1.MockDataService,
                data_service_1.DataService
            ],
            templateUrl: 'build/dashboard/dashboard.html',
            inputs: ['data'],
            outputs: ['dataEvent']
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, data_service_1.DataService])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFBeUQsZUFBZSxDQUFDLENBQUE7QUFFekUsOEJBQTRDLGVBQWUsQ0FBQyxDQUFBO0FBRTVELHNCQUFvQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RELDhCQUEwQyx5QkFBeUIsQ0FBQyxDQUFBO0FBQ3BFLDZCQUFxQywyQkFFckMsQ0FBQyxDQUYrRDtBQUloRSxzQkFBaUQsVUFBVSxDQUFDLENBQUE7QUFFNUQsK0JBQStCO0FBa0IvQjtJQUlDLG1CQUFvQixHQUFrQixFQUFTLFdBQXdCO1FBQW5ELFFBQUcsR0FBSCxHQUFHLENBQWU7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN0RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUVELHdCQUFJLEdBQUo7UUFBQSxpQkFhQztRQVpBLElBQUksQ0FBQyxJQUFJLEdBQUssSUFBSSxDQUFDO1FBRW5CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxVQUFVLEdBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRWhDLElBQUksVUFBVSxHQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFVBQVUsQ0FBQzthQUN0RyxTQUFTLENBQUUsVUFBQSxJQUFJO1lBQ2YsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBQ0MsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCwrQkFBVyxHQUFYLFVBQVksT0FBVztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUgsaUNBQWEsR0FBYixVQUFjLEdBQUc7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGlDQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDaEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQTdESDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixVQUFVLEVBQUUsQ0FBQyxhQUFLLEVBQUUsNkJBQWEsQ0FBQztZQUVsQyxTQUFTLEVBQUU7Z0JBQ1YsZ0JBQVE7Z0JBQ1IsdUJBQWU7Z0JBQ2YsMEJBQVc7YUFDWDtZQUVELFdBQVcsRUFBRSxnQ0FBZ0M7WUFFN0MsTUFBTSxFQUFHLENBQUMsTUFBTSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN2QixDQUFDOztpQkFBQTtJQWdERixnQkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0M7QUE5Q1ksaUJBQVMsWUE4Q3JCLENBQUEifQ==