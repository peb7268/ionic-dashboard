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
var data_service_1 = require('../dashboard/data.service');
//TODO: Figure out how to pass the data better using an observable and an event emitter
var Chart = (function () {
    function Chart(dataService) {
        this.dataService = dataService;
        console.log('Chart:constructor');
        this.data = this.dataService.getData();
        window['App'].instances.chart = this;
    }
    //Fires on init
    Chart.prototype.ngOnInit = function () { console.log('ngOnInit: this.data: ', this.data); };
    Chart.prototype.ngOnChanges = function (changes) {
        console.log('Chart:ngOnChanges: this.data: ', this.data);
        if (typeof this.data == 'undefined')
            return;
        if (this.data !== null && typeof this.data == 'object') {
            this.composeChart(this.chartType, this.data.data);
        }
    };
    Chart.prototype.throwChartError = function () {
        console.log('throwing chart error');
    };
    Chart.prototype.getLabels = function (concepts) {
        var labels = concepts.map(function (concept) {
            return concept.name;
        });
        //console.log('labels: ', labels);
        return labels;
    };
    /*
    * Return an array of arrays representing series data
    * TODO: Need to refactor this so it can handle more than vwap charts
    * it should be able to delegate and return series data for multiple types of charts.
    */
    Chart.prototype.getSeriesData = function (vwapData) {
        var seriesData = [];
        var best_data = [];
        var worst_data = [];
        for (var concept_id in vwapData.best_count) {
            best_data.push(vwapData.best_count[concept_id][0]);
            worst_data.push(vwapData.worst_count[concept_id][0]);
        }
        seriesData.push(best_data, worst_data);
        return seriesData;
    };
    /*
    ** Get the Highest value to be plotted on the chart
    ** plus some offset so the chart doesnt go all the way to the bounds.
    */
    Chart.prototype.getChartHigh = function (seriesData, offset) { };
    Chart.prototype.getChartLow = function (seriesData, offset) { };
    Chart.prototype.getYLabelVal = function (yCoord, yVal) {
        var offset = 20;
        var yLabelVal = (yVal > 0) ? yCoord + offset : yCoord - (offset - 10);
        return yLabelVal;
    };
    //Delegates to whichever specific chart type we are working with
    Chart.prototype.composeChart = function (chartType, data) {
        console.log('composing a ' + this.chartType + ' chart.');
        window['App'].instances.chart = this;
        if (data == null)
            return;
        switch (chartType) {
            case "netattraction":
                var chart = this.composeBarChart(data);
                this.dataService.pushChart(chartType, data, chart);
                break;
            default:
                console.log('default switch matched');
                break;
        }
    };
    Chart.prototype.composeBarChart = function (data) {
        var labels = this.getLabels(data.concepts);
        var seriesData = this.getSeriesData(data);
        var _data = {
            labels: labels,
            series: seriesData
        };
        //Set the options: See the defauts for bar charts in chartist.js: ~3625
        var options = {
            stackBars: true,
            stackMode: 'overlap',
            //reverseData: true,
            axisY: {
                labelInterpolationFnc: function (value) {
                    return (value);
                    //return (value / 1000) + 'k';
                }
            },
            high: 50,
            low: -50,
            plugins: []
        };
        console.log('cheching chart existence');
        var _chart = document.querySelectorAll('.ct-chart');
        if (_chart.length == 0) {
            var dashboard = document.querySelectorAll('dashboard')[0];
            _chart = document.createElement('ct-chart');
            _chart.classList.add('ct-chart');
            dashboard.appendChild(_chart);
        }
        //Instantiate the chart
        var chart = new Chartist.Bar('.ct-chart', {
            labels: _data.labels,
            series: _data.series
        }, options);
        //Add Custom labels
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 50px'
                });
                if (typeof window['App'].instances.chart.getYLabelVal !== 'function')
                    return;
                /* Bar labels //
                ** data.value.y: The value that is being demonstrated on the graph
                ** data.y1 / data.y2: The points to plot the bars on the graph ( start and stop of the bar ) */
                var xVal = data.x1;
                var yVal = window['App'].instances.chart.getYLabelVal(data.y2, data.value.y);
                data.group.elem('text', {
                    x: xVal,
                    y: yVal,
                    style: 'text-anchor: middle'
                }, 'barLabel').text(data.value.y);
            }
        });
        //Add hover behavior
        chart.on('hover', function (data) {
            console.log('hovering: ', data);
            if (data.type === 'bar') { }
        });
        //For changing nav
        chart.on('created', function (data) {
            console.log('chart created');
            chart.off('created');
            var self = window['App'].instances.dashboard;
            self.dismissLoader(250);
        });
        return chart;
    };
    Chart = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: "build/charts/chart.html",
            inputs: ['data', 'chartType'],
            outputs: ['dataEvent']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], Chart);
    return Chart;
}());
exports.Chart = Chart;
//# sourceMappingURL=chart.js.map