"use strict";
var http_1 = require('@angular/http');
require('rxjs/Rx');
var data_service_1 = require('./data.service');
var testing_1 = require('@angular/core/testing');
var mocks_1 = require('./../mocks');
var mocks_2 = require('./../mocks');
var dataService = null;
var httpService = new mocks_2.HttpMock();
//Our parent block
describe('DataService', function () {
    beforeEach(function () {
        testing_1.addProviders([
            { provide: http_1.Http, useClass: mocks_2.HttpMock }
        ]);
        var platform = (new mocks_1.MockClass());
        dataService = new data_service_1.DataService(httpService);
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EscUJBQWdELGVBQWUsQ0FBQyxDQUFBO0FBTWhFLFFBQU8sU0FBUyxDQUFDLENBQUE7QUFHakIsNkJBQWdELGdCQUdoRCxDQUFDLENBSCtEO0FBSWhFLHdCQUFnRCx1QkFBdUIsQ0FBQyxDQUFBO0FBR3hFLHNCQUFnRCxZQUFZLENBQUMsQ0FBQTtBQUM3RCxzQkFBZ0QsWUFBWSxDQUFDLENBQUE7QUFHN0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLElBQUksV0FBVyxHQUFVLElBQUksZ0JBQVEsRUFBRSxDQUFDO0FBRXhDLGtCQUFrQjtBQUNsQixRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLFVBQVUsQ0FBQztRQUNULHNCQUFZLENBQUM7WUFDUCxFQUFDLE9BQU8sRUFBRSxXQUFJLEVBQUUsUUFBUSxFQUFFLGdCQUFRLEVBQUM7U0FDeEMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxRQUFRLEdBQUcsQ0FBTSxJQUFJLGlCQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLFdBQVcsR0FBRyxJQUFJLDBCQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFDL0IsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1lBQ2pDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ3hCLElBQUksRUFBRSxHQUFJLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFFeEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFTixFQUFFLENBQUMsbURBQW1ELEVBQUU7WUFDdkQsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDdkMsTUFBTSxDQUFDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUEsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsb0NBQW9DLEVBQUU7WUFDckMsTUFBTSxDQUFDLE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==