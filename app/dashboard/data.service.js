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
var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
//import { App } 					    from './../globals';
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.charts = {};
        this.instances = {};
        console.log('DataService:constructor');
    }
    DataService.prototype.fetchData = function (localData, project_id, callback) {
        var _this = this;
        if (project_id === void 0) { project_id = null; }
        console.log('DataService:fetchData');
        var observable, data;
        //TODO: Look up ES6 Features I can use to bypasss this
        window['App'].self = this;
        var cache = window.localStorage.getItem('cache_settings');
        cache = (typeof cache !== 'undefined' && cache == 'true') ? true : false;
        if (localData !== null && typeof localData == 'string' && cache == true) {
            console.log('DataService:fetchData fetching cached data:');
            data = JSON.parse(localData);
            observable = Observable_1.Observable.create(function (observer) {
                _this.data = data;
                observer.next(data);
                observer.complete();
            });
            return observable;
        }
        else {
            console.log('DataService:fetchData fetching data from source');
            observable = this.http.get('http://www.intengoresearch.com/dash/projects/' + project_id);
        }
        return observable;
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
        window.setTimeout(function () {
            console.log('dashboard intialized');
            window['App'].loading.dismiss();
        }, 500);
        return data;
    };
    /* Cached project matches project being fetched */
    DataService.prototype.isCurrentProject = function (projectId, newProjectId) {
        return (projectId === newProjectId);
    };
    DataService.prototype.studiesDidChange = function (project_id, data) {
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
        window['App'].self.instances.Dashboard.initializeDashboard();
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map