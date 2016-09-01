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
var ionic_angular_1 = require('ionic-angular');
var Observable_1 = require('rxjs/Observable');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/Rx');
var settings_1 = require('../pages/settings/settings');
//import { App } 					    from './../globals';
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.charts = {};
        this.instances = {};
        window['App'].instances.dataService = this;
        this.SettingsPage = settings_1.SettingsPage;
        this.dataSubject = new BehaviorSubject_1.BehaviorSubject(this.data);
    }
    DataService.prototype.fetchData = function (localData, project_id, callback) {
        if (project_id === void 0) { project_id = null; }
        console.log('DataService:fetchData');
        if (this.dataFetchInProgress()) {
            window['App'].instances.dashboard.dismissLoader(500);
            return this.dataSubject.asObservable();
        }
        var cache = window.localStorage.getItem('cache_settings');
        cache = (typeof cache !== 'undefined' && cache == 'true') ? true : false;
        if (localData !== null && typeof localData == 'string' && cache == true) {
            console.log('DataService:fetchData fetching cached data:');
            var data = JSON.parse(localData);
            this.dataSubject.next(data);
            return this.dataSubject.asObservable();
        }
        else {
            window['App'].activeRequests++;
            console.log('DataService:fetchData fetching data from source');
            return this.http.get('http://www.intengoresearch.com/dash/projects/' + project_id)
                .map(function (resp) { return resp.json(); })
                .catch(this.catchError);
        }
    };
    DataService.prototype.catchError = function (error) {
        var errMsg = 'Error ' + error.status + ' ' + error.statusText;
        console.error(errMsg);
        window['App'].confirm = ionic_angular_1.Alert.create({
            'title': 'Oops!',
            'message': 'Looks like there was an error loading your project.',
            'buttons': [
                {
                    text: 'Retry',
                    handler: function () {
                        console.log('Try the request again');
                    }
                },
                {
                    text: 'Select Another',
                    handler: function () {
                        console.log('Returning to the settings screen.');
                        window['App'].confirm.dismiss().then(function () {
                            var SettingsPage = window['App'].instances.dataService.SettingsPage;
                            window['App'].instances.dashboard.nav.push(SettingsPage);
                        });
                    }
                }
            ]
        });
        window['App'].instances.dashboard.dismissLoader(250);
        window['App'].instances.dashboard.nav.present(window['App'].confirm);
        return Observable_1.Observable.throw(errMsg);
    };
    DataService.prototype.dataFetchInProgress = function () {
        return window['App'].activeRequests > 0;
    };
    DataService.prototype.storeData = function (data) {
        console.log('Observable setting data: Project specific data came back with: ', data);
        window.localStorage.setItem('project_data', JSON.stringify(data));
        this.data = data;
        return data;
    };
    DataService.prototype.delegateData = function (project_id, data) {
        var _shouldStoreData = this.shouldStoreData(data, project_id);
        console.log('Should Store Data?: ' + _shouldStoreData);
        data = this.storeData(data);
        console.log('DataService:delegateData');
        return data;
    };
    /* Cached project matches project being fetched */
    DataService.prototype.isCurrentProject = function (projectId, newProjectId) {
        return (projectId === newProjectId);
    };
    DataService.prototype.studiesDidChange = function (project_id, data) {
        // && window['App'].activeRequests == 0
        if (data === null)
            return true;
        return (project_id !== data.survey.id);
    };
    DataService.prototype.shouldStoreData = function (data, project_id) {
        return (this.dataIsValid(data) && this.isCurrentProject(project_id, data.survey.id));
    };
    /* Confirms data from local storage is an acutal response object */
    DataService.prototype.dataIsValid = function (data) {
        return (typeof data == 'object' && data !== null);
    };
    DataService.prototype.getData = function () {
        return this.data;
    };
    DataService.prototype.getDataCache = function () {
        var _data = window.localStorage.getItem('project_data');
        _data = (typeof _data == 'string') ? JSON.parse(_data) : null;
        return _data;
    };
    DataService.prototype.getProjectId = function (data) {
        if (data === void 0) { data = null; }
        return (this.dataIsValid(data)) ? data.id : window.localStorage.getItem('project_id');
    };
    DataService.prototype.pushChart = function (chartType, data, chart) {
        var chart_id = chartType + '-' + data.survey.id;
        this.charts[chart_id] = chart;
    };
    DataService.prototype.removeCharts = function () {
        for (var chartName in this.charts) {
            var chart = this.charts[chartName];
            chart.detach();
            chart.container.remove();
        }
    };
    DataService.prototype.reloadCharts = function () {
        window['App'].instances.dashboard.initializeDashboard();
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBRTNDLDhCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUUzQywyQkFBZ0MsaUJBQWlCLENBQUMsQ0FBQTtBQUNsRCxnQ0FBb0Msc0JBQXNCLENBQUMsQ0FBQTtBQUMzRCxRQUFPLFNBQVMsQ0FBQyxDQUFBO0FBRWpCLHlCQUFpQyw0QkFBNEIsQ0FBQyxDQUFBO0FBRTlELDhDQUE4QztBQUk5QztJQU9DLHFCQUFtQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUp0QixXQUFNLEdBQU0sRUFBRSxDQUFDO1FBQ2YsY0FBUyxHQUFPLEVBQUUsQ0FBQztRQUl6QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBSSx1QkFBWSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLFNBQVMsRUFBRSxVQUFpQixFQUFFLFFBQVM7UUFBNUIsMEJBQWlCLEdBQWpCLGlCQUFpQjtRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUs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