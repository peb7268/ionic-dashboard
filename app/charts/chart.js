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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQXlELGVBQWUsQ0FBQyxDQUFBO0FBR3pFLDZCQUF5RCwyQkFFekQsQ0FBQyxDQUZtRjtBQUlwRix1RkFBdUY7QUFTdkY7SUFJRSxlQUFtQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUQsZUFBZTtJQUNmLHdCQUFRLEdBQVIsY0FBYSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0QsMkJBQVcsR0FBWCxVQUFZLE9BQVc7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekQsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUUzQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0gsQ0FBQztJQUVELCtCQUFlLEdBQWY7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHNC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