"use strict";
var http_1 = require('@angular/http');
var ionic_angular_1 = require('ionic-angular');
require('rxjs/Rx');
var data_service_1 = require('./data.service');
var testing_1 = require('@angular/core/testing');
//Mock Setup Stuff
var mocks_1 = require('./../mocks');
var dataService = null;
var httpService = new mocks_1.HttpMock();
var mockDataSercice = new mocks_1.MockDataService(httpService);
//Our parent block
describe('DataService', function () {
    var platform;
    beforeEach(function () {
        testing_1.addProviders([
            { provide: http_1.Http, useClass: mocks_1.HttpMock },
            { provide: ionic_angular_1.NavController, useClass: mocks_1.NavMock }
        ]);
        platform = new mocks_1.MockClass();
        dataService = new data_service_1.DataService(httpService);
    });
    afterEach(function () {
        window['App'].activeRequests = 0;
        window.localStorage.clear();
    });
    describe('DataService Initialize', function () {
        it('App is attatched to the window', function () {
            var App = window['App'];
            var i = App.instances;
            var ds = i.dataService;
            expect(typeof App).toBe('object');
            expect(typeof i).toBe('object');
            expect(typeof ds).toBe('object');
        });
        it('Attatches the dataService to the window correctly', function () {
            var ds = window['App'].instances.dataService;
            expect(typeof window['App']).toBe('object');
            expect(typeof window['App'].instances).toBe('object');
            expect(typeof ds).toBe('object');
        });
        it('Has the correct page instances', function () {
            expect(typeof dataService.SettingsPage).toBe('function');
        });
        it('returns an observable for the data', function () {
            expect(typeof dataService.dataSubject).toBe('object');
        });
    });
    describe('Should know how to switch between live data stream or cache', function () {
        it('should use cached data if provided a json string and cache is set to true', function () {
            var data = "{\"data\": \"im some data\"}";
            var should_cache = 'true';
            var use_cache = dataService.useCachedData(data, should_cache);
            expect(use_cache).toBeTruthy();
        });
        it('should not use cached data if should cache is false', function () {
            var data = "{\"data\": \"im some data\"}";
            var should_cache = 'false';
            var use_cache = dataService.useCachedData(data, should_cache);
            expect(use_cache).toBeFalsy();
        });
        it('should not use cached data if data is null', function () {
            var data = null;
            var should_cache = 'true';
            var use_cache = dataService.useCachedData(data, should_cache);
            expect(use_cache).toBeFalsy();
        });
        it('should not use cached data if data is undefined', function () {
            var data;
            var should_cache = 'true';
            var use_cache = dataService.useCachedData(data, should_cache);
            expect(use_cache).toBeFalsy();
        });
    });
    describe('Should know if cached project mathes current project', function () {
        //For when the user selects a new study
        it('should return false if the cached project doesnt match the project being fetched', function () {
            var mockData = platform.getData();
            var isCurrentProject = dataService.isCurrentProject(mockData.survey.id, 20);
            expect(isCurrentProject).toBeFalsy();
        });
        it('should return true if the cached project matches the project being fetched', function () {
            var mockData = platform.getData();
            var isCurrentProject = dataService.isCurrentProject(mockData.survey.id, '5');
            expect(isCurrentProject).toBeTruthy();
        });
    });
    describe('Should know if there is a data fetch in progress', function () {
        it('returns true if App.activeRequests is > 0', function () {
            window['App'].activeRequests = 1;
            var dataFetchInProgress = dataService.dataFetchInProgress();
            expect(dataFetchInProgress).toBeTruthy();
        });
        it('returns false if App.activeRequests is == 0', function () {
            window['App'].activeRequests = 0;
            var dataFetchInProgress = dataService.dataFetchInProgress();
            expect(dataFetchInProgress).toBeFalsy();
        });
    });
    describe('Should Fetch Data', function () {
        it('should return a blank observable if there is a data fetch in progress', function () {
            window['App'].activeRequests = 1;
            window['App'].instances = {
                dashboard: {
                    dismissLoader: function (timer) { }
                }
            };
            var result = dataService.fetchData();
            expect(typeof result).toBe('object');
            expect(typeof result.source.hasCompleted).toBe('boolean');
        });
        it('Should return an observable with cached data if useCachedData is true', function () {
            var mockData = JSON.stringify(platform.getData());
            window.localStorage.setItem('cache_settings', 'true');
            window['App'].activeRequests = 0;
            var result = dataService.fetchData(mockData);
            expect(typeof result).toBe('object');
            expect(result.constructor.name).toBe('SubjectObservable');
            expect(typeof result.source.hasCompleted).toBe('boolean');
            expect(typeof result.source.value).toBe('object');
            expect(typeof result.source.value.data).toBe('object');
            expect(typeof result.source.value.data.completes).toBe('number');
            expect(typeof result.source.value.survey.id).toBe('string');
        });
        it('Should make a request to the source for the data, increment the active requests, and return an observable', function () {
            var mockData = JSON.stringify(platform.getData());
            var project_id = JSON.parse(mockData).survey.id;
            window.localStorage.clear();
            window['App'].activeRequests = 0;
            expect(window['App'].activeRequests).toEqual(0);
            var result = dataService.fetchData(mockData, project_id);
            expect(window['App'].activeRequests).toEqual(1);
            expect(typeof result).toBe('object');
            expect(result.constructor.name).toBe('Observable');
        });
    });
    describe('Should be able to store data', function () {
        it('can store an object', function () {
            var data;
            expect(window.localStorage.getItem('project_data')).toBeNull();
            var obj = {
                name: 'Paul',
                hobby: 'code'
            };
            dataService.storeData(obj);
            data = window.localStorage.getItem('project_data');
            expect(data).toBeDefined();
            expect(typeof data).toBe('string');
            data = JSON.parse(data);
            expect(data.name.toLowerCase()).toEqual('paul');
            expect(data.hobby.toLowerCase()).toEqual('code');
        });
    });
    describe('Should have a data getter', function () {
        it('should get data from an internal propery', function () {
            var mockData = JSON.stringify(platform.getData());
            var data;
            window.localStorage.setItem('cache_settings', 'true');
            window['App'].activeRequests = 0;
            var result = dataService.fetchData(mockData);
            result.subscribe(function (res) {
                dataService.data = res;
            });
            data = dataService.getData();
            expect(data).toBeDefined();
            expect(typeof data).toBe('object');
            expect(dataService.data).toBeDefined();
            expect(typeof dataService.data).toBe('object');
        });
        it('should get data from a cached value', function () {
            var mockData = JSON.stringify(platform.getData());
            var data;
            window.localStorage.setItem('cache_settings', 'true');
            window['App'].activeRequests = 0;
            var result = dataService.fetchData(mockData);
            result.subscribe(function (res) {
                dataService.data = res;
            });
            data = dataService.getData(true);
            expect(data).toBeDefined();
            expect(typeof data).toBe('object');
        });
    });
    describe('Should retrieve the project_id', function () {
        it('Should retrieve the project_id from a passed data set', function () {
            var mockData = platform.getData().survey;
            var project_id = dataService.getProjectId(mockData);
            expect(project_id).toBeDefined();
            expect(typeof project_id).toBe('string');
            expect(project_id).toBe('5');
        });
        it('Should retrieve the project_id from local storage', function () {
            window.localStorage.setItem('project_id', '5');
            var project_id = dataService.getProjectId();
            expect(project_id).toBeDefined();
            expect(typeof project_id).toBe('string');
            expect(project_id).toBe('5');
        });
    });
    describe('Should add and remove charts from the charts property', function () {
        it('can add a chart to dataService.charts when pushChart is called', function () {
            var charts = dataService.charts;
            var chartCount = dataService.getChartCount(charts);
            var data = platform.getData();
            var chartType = 'netattraction';
            var chart = {};
            expect(chartCount).toEqual(0);
            dataService.pushChart(chartType, data, chart);
            chartCount = dataService.getChartCount(charts);
            expect(chartCount).toEqual(1);
        });
        xit('can add a chart to dataService.charts when pushChart is called', function () {
            var charts = dataService.charts;
            var chartCount = dataService.getChartCount(charts);
            var data = platform.getData();
            var chartType = 'netattraction';
            var chart = {
                detach: function () { },
                container: {
                    remove: function () { }
                }
            };
            expect(chartCount).toEqual(0);
            dataService.pushChart(chartType, data, chart);
            chartCount = dataService.getChartCount(charts);
            expect(chartCount).toEqual(1);
            dataService.removeCharts();
            chartCount = dataService.getChartCount(charts);
            console.log('chartCount: ', chartCount);
            expect(chartCount).toEqual(0);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EscUJBQWdELGVBQWUsQ0FBQyxDQUFBO0FBRWhFLDhCQUFnRCxlQUFlLENBQUMsQ0FBQTtBQUloRSxRQUFPLFNBQVMsQ0FBQyxDQUFBO0FBR2pCLDZCQUFnRCxnQkFHaEQsQ0FBQyxDQUgrRDtBQUloRSx3QkFBZ0QsdUJBQXVCLENBQUMsQ0FBQTtBQUV4RSxrQkFBa0I7QUFDbEIsc0JBS08sWUFBWSxDQUFDLENBQUE7QUFFcEIsSUFBSSxXQUFXLEdBQVcsSUFBSSxDQUFDO0FBQy9CLElBQUksV0FBVyxHQUFXLElBQUksZ0JBQVEsRUFBRSxDQUFDO0FBQ3pDLElBQUksZUFBZSxHQUFPLElBQUksdUJBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUUzRCxrQkFBa0I7QUFDbEIsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUNwQixJQUFJLFFBQVksQ0FBQztJQUVqQixVQUFVLENBQUM7UUFDVCxzQkFBWSxDQUFDO1lBQ1AsRUFBQyxPQUFPLEVBQUUsV0FBSSxFQUFFLFFBQVEsRUFBRSxnQkFBUSxFQUFDO1lBQ25DLEVBQUMsT0FBTyxFQUFFLDZCQUFhLEVBQUUsUUFBUSxFQUFFLGVBQU8sRUFBQztTQUNoRCxDQUFDLENBQUE7UUFDRixRQUFRLEdBQU8sSUFBSSxpQkFBUyxFQUFFLENBQUM7UUFDL0IsV0FBVyxHQUFJLElBQUksMEJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUVILFNBQVMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFDL0Is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