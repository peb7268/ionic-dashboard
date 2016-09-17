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
        this.loading = Loading.create();
        window['App'].instances.dataService = this;
        this.SettingsPage = settings_1.SettingsPage;
        this.dataSubject = new BehaviorSubject_1.BehaviorSubject(this.data);
    }
    DataService.prototype.fetchData = function (localData, project_id) {
        if (project_id === void 0) { project_id = null; }
        var useCachedData = this.useCachedData(localData);
        if (this.dataFetchInProgress()) {
            debugger;
            window['App'].instances.dashboard.dismissLoader(500);
            return this.dataSubject.asObservable();
        }
        if (useCachedData) {
            var data = JSON.parse(localData);
            this.dataSubject.next(data);
            return this.dataSubject.asObservable();
        }
        else {
            window['App'].activeRequests++;
            return this.http.get('http://www.intengoresearch.com/dash/projects/' + project_id)
                .map(function (resp) { return resp.json(); })
                .catch(this.catchError);
        }
    };
    DataService.prototype.catchError = function (error) {
        console.log('DataService Error Caught: ');
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
        debugger;
        window['App'].instances.dashboard.dismissLoader(250);
        window['App'].instances.dashboard.nav.present(window['App'].confirm);
        return Observable_1.Observable.throw(errMsg);
    };
    DataService.prototype.dataFetchInProgress = function () {
        return window['App'].activeRequests > 0;
    };
    //Change this to just store. Obviously its storing data
    //Adapt it to store / stringify all types of data
    DataService.prototype.storeData = function (data, persist) {
        if (typeof persist == 'undefined' || persist == true)
            window.localStorage.setItem('project_data', JSON.stringify(data));
        this.data = data;
        return data;
    };
    DataService.prototype.delegateData = function (project_id, data) {
        var _shouldStoreData = this.shouldStoreData(data, project_id);
        //console.log('Should Store Data?: ' + _shouldStoreData);
        data = this.storeData(data);
        //console.log('DataService:delegateData');	    
        return data;
    };
    //TODO: Combine isCurrentProject and studiesDidChange. Seem redundant
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
    //TODO: make a retrieval mechanism where data is returned and validity is checked.
    /* Confirms data from local storage is an acutal response object */
    DataService.prototype.dataIsValid = function (data) {
        return (typeof data == 'object' && data !== null);
    };
    DataService.prototype.useCachedData = function (data, cache) {
        var cache = (typeof cache == 'undefined') ? window.localStorage.getItem('cache_settings') : cache;
        cache = (typeof cache !== 'undefined' && cache == 'true') ? true : false;
        var use_cached = (data !== null && typeof data == 'string' && cache == true);
        return use_cached;
    };
    DataService.prototype.getData = function (returnCached) {
        if (returnCached !== 'undefined' && returnCached == true) {
            var _data = window.localStorage.getItem('project_data');
            _data = (typeof _data == 'string') ? JSON.parse(_data) : null;
            return _data;
        }
        return this.data;
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
        this.charts = {};
    };
    DataService.prototype.reloadCharts = function () {
        window['App'].instances.dashboard.init();
    };
    DataService.prototype.getChartCount = function (charts) {
        var chartCount = 0;
        for (var name in charts) {
            if (name.indexOf('netattraction') > -1)
                chartCount++;
        }
        return chartCount;
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxxQkFBcUMsZUFBZSxDQUFDLENBQUE7QUFDckQscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBSTNDLDhCQUEyQixlQUFlLENBQUMsQ0FBQTtBQUUzQywyQkFBZ0MsaUJBQWlCLENBQUMsQ0FBQTtBQUNsRCxnQ0FBb0Msc0JBQXNCLENBQUMsQ0FBQTtBQUMzRCxRQUFPLFNBQVMsQ0FBQyxDQUFBO0FBRWpCLHlCQUFpQyw0QkFBNEIsQ0FBQyxDQUFBO0FBRTlELDhDQUE4QztBQUk5QztJQVFDLHFCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUx2QixXQUFNLEdBQU0sRUFBRSxDQUFDO1FBQ2YsY0FBUyxHQUFPLEVBQUUsQ0FBQztRQUVuQixZQUFPLEdBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBR25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFJLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFJLHVCQUFZLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBSSxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsU0FBUyxFQUFFLFVBQWlCO1FBQWpCLDBCQUFpQixHQUFqQixpQkFBaUI7UUFDckMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFDOUIsUUFBUSxDQUFDO1lBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEdB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