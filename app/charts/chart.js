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
var mocks_1 = require('../mocks');
//TODO: Figure out how to pass the data better using an observable and an event emitter
var Chart = (function () {
    function Chart(dataService) {
        this.dataService = dataService;
        this.changed = false;
        this.events = [];
        this.yLabelMinOffset = 20;
        this.data = this.dataService.getData(true);
        window['App'].instances.chart = this;
    }
    //Fires on init
    Chart.prototype.ngOnInit = function () { };
    Chart.prototype.ngOnChanges = function (changes) {
        if (typeof this.data == 'undefined')
            return;
        this.changed = true; //for testing - maybe take this out
        if (this.data !== null && typeof this.data == 'object') {
            this.composeChart(this.chartType, this.data);
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
    Chart.prototype.getSeriesData = function (data) {
        var seriesData = [];
        var best_data = [];
        var worst_data = [];
        for (var i = 0; i < data.concepts.length; i++) {
            var cid = data.concepts[i].id;
            best_data.push(data.netattraction[cid].best_percent);
            worst_data.push(data.netattraction[cid].worst_percent);
        }
        seriesData.push(best_data, worst_data);
        return seriesData;
    };
    /*
    ** Get the Highest value to be plotted on the chart
    ** plus some offset so the chart doesnt go all the way to the bounds.
    */
    Chart.prototype.getChartHigh = function (seriesData, offset) {
        var offset = offset || 0;
        var highs = [Math.max.apply(Math, seriesData[0]), Math.max.apply(Math, seriesData[1])];
        Math.min.apply(Math, highs);
        var high = Number(highs[0]) + offset;
        return high;
    };
    Chart.prototype.getChartLow = function (seriesData, offset) {
        var offset = offset || 0;
        var lows = [Math.min.apply(Math, seriesData[0]), Math.min.apply(Math, seriesData[1])];
        var low = Number(Math.min.apply(Math, lows)) + offset;
        if (low > 0) {
            var negatives = lows.filter(function (num) {
                return num < 0;
            });
            low = Number(Math.min.apply(Math, negatives)) + offset;
        }
        return low;
    };
    Chart.prototype.getYLabelVal = function (yCoord, yVal) {
        var offset = this.getYLabelOffset(yCoord, yVal);
        var yLabelVal = (yVal > 0) ? yCoord + offset : yCoord - (offset - 10);
        return yLabelVal;
    };
    Chart.prototype.getYLabelOffset = function (coord, val) {
        var offset = (val > 0) ? -5 : -(5);
        return offset;
    };
    //Delegates to whichever specific chart type we are working with
    Chart.prototype.composeChart = function (chartType, data) {
        var _data = data;
        //console.log('composing a ' + this.chartType + ' chart.');
        window['App'].instances.chart = this;
        if (_data == null)
            return;
        switch (chartType) {
            case "netattraction":
                var chart = this.composeBarChart(_data);
                this.instance = chart;
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
            high: this.getChartHigh(_data.series, 10),
            low: this.getChartLow(_data.series, -10),
            plugins: []
        };
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
            //console.log('pushing draw event');
            window['App'].instances.chart.events.push('draw');
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
            chart.off('created');
            var self = window['App'].instances.dashboard;
            self.dismissLoader(1500);
        });
        return chart;
    };
    Chart = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: "build/charts/chart.html",
            providers: [
                mocks_1.MockDataService,
                data_service_1.DataService,
                mocks_1.HttpMock
            ],
            inputs: ['data', 'chartType'],
            outputs: ['dataEvent']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], Chart);
    return Chart;
}());
exports.Chart = Chart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQXlELGVBQWUsQ0FBQyxDQUFBO0FBR3pFLDZCQUF5RCwyQkFDekQsQ0FBQyxDQURtRjtBQUNwRixzQkFBeUQsVUFBVSxDQUFDLENBQUE7QUFJcEUsdUZBQXVGO0FBYXZGO0lBUUUsZUFBbUIsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFMcEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCLG9CQUFlLEdBQUksRUFBRSxDQUFDO1FBRzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxlQUFlO0lBQ2Ysd0JBQVEsR0FBUixjQUFXLENBQUM7SUFFWiwyQkFBVyxHQUFYLFVBQVksT0FBVztRQUNyQixFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUUsbUNBQW1DO1FBRXpELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUM7SUFFRCwrQkFBZSxHQUFmO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFD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