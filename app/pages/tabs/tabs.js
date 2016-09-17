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
var home_1 = require('../home/home');
var settings_1 = require('../settings/settings');
var data_service_1 = require('../../dashboard/data.service');
//import { Dashboard }  from '../../dashboard/dashboard';
var TabsPage = (function () {
    function TabsPage(nav, dataService) {
        this.nav = nav;
        this.dataService = dataService;
        window['App'].instances.tabsPage = this;
        //console.log('TabsPage:constructor');
        // this tells the tabs component which Pages
        // should be each tab's root Page
        var currentTab = window.localStorage.getItem('cache_settings');
        currentTab = (currentTab !== null) ? 0 : 1;
        this.currentTab = currentTab;
        this.tab1Root = home_1.HomePage;
        this.tab2Root = settings_1.SettingsPage;
    }
    //TODO: When you click the dashboard page and you have changed studies load the data from the new study
    TabsPage.prototype.initDash = function () {
        //console.log('TabsPage:initDash Initializing Dashboard');
        var project_id = this.dataService.getProjectId();
        var data_cache = this.dataService.getData(true);
        if (this.dataService.studiesDidChange(project_id, data_cache)) {
            //reload data
            console.log('Reloading The Data From Web Service');
            window.localStorage.removeItem('project_data');
            this.dataService.removeCharts();
            this.dataService.reloadCharts();
        }
        else {
            console.log('Displaying the dash with cache');
        }
    };
    TabsPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/tabs/tabs.html',
            outputs: ['data']
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, data_service_1.DataService])
    ], TabsPage);
    return TabsPage;
}());
exports.TabsPage = TabsPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUF5QyxlQUN6QyxDQUFDLENBRHVEO0FBQ3hELDhCQUF5QyxlQUFlLENBQUMsQ0FBQTtBQUV6RCxxQkFBeUMsY0FBYyxDQUFDLENBQUE7QUFDeEQseUJBQXlDLHNCQUFzQixDQUFDLENBQUE7QUFFaEUsNkJBQXlDLDhCQUd6QyxDQUFDLENBSHNFO0FBQ3ZFLHlEQUF5RDtBQU96RDtJQUtFLGtCQUFtQixHQUFrQixFQUFTLFdBQXdCO1FBQW5ELFFBQUcsR0FBSCxHQUFHLENBQWU7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNwRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDeEMsc0NBQXNDO1FBRXRDLDRDQUE0QztRQUM1QyxpQ0FBaUM7UUFDakMsSUFBSSxVQUFVLEdBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3RCxVQUFVLEdBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFJLGVBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFJLHVCQUFZLENBQUM7SUFDaEMsQ0FBQztJQUVELHVHQUF1RztJQUN2RywyQkFBUSxHQUFSO1FBQ0UsMERBQTBEO1FBRTFELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzVELGFBQWE7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0gsQ0FBQztJQXpDSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNsQixDQUFDOztnQkFBQTtJQXVDRixlQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSxnQkFBUSxXQXFDcEIsQ0FBQSJ9