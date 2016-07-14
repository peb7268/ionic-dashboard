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
//TODO: Explore passing data into this compoonent from dashboard because I still dont think it's 100% right.
var Chart = (function () {
    function Chart() {
    }
    //Fires on init
    Chart.prototype.ngOnInit = function () { };
    Chart.prototype.ngOnChanges = function (changes) {
        //console.log('ngOnChanges');
        this.composeBarChart(this.data);
    };
    Chart.prototype.composeBarChart = function (resp) {
        //console.log('composeBarChart', resp);
        //if(resp.length == 0) return;
        //var resp    = JSON.parse(resp);
        //TODO: Calculate Net Attraction and plot it in series
        //TODO: Calculate Axis and plot it in labels
        /*
          Aggregate and sort Chart Data
          [200000, 400000, 500000, 300000],
          [100000, 200000, 400000, 600000]
        */
        var data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            series: [
                [-800000, -1200000, 1400000, 1300000],
                [-200000, -1000000, 800000, 1500000]
            ]
        };
        //Set the options
        var options = {
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function (value) {
                    return (value / 1000) + 'k';
                }
            },
            plugins: [
                Chartist.plugins.ctPointLabels({
                    textAnchor: 'middle'
                })
            ]
        };
        //Instantiate the chart
        var chart = new Chartist.Bar('.ct-chart', {
            labels: data.labels,
            series: data.series
        }, options);
        //Add Customization
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 30px'
                });
                data.group.elem('text', {
                    x: data.x1,
                    y: data.y1,
                    style: 'text-anchor: middle'
                }, 'barLabel').text(data.value.x + ', ' + data.value.y);
            }
        });
        chart.on('created', function (data) {
            setTimeout(function () {
                window['App'].loading.destroy();
            }, 3500);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "data", void 0);
    Chart = __decorate([
        core_1.Component({
            selector: 'chart',
            //templateUrl: 'dashboard/dashboard.html',
            inputs: ['data', 'chartType', 'test'],
            template: "\n  <div class='ct-chart ct-perfect-fourth'></div> \n "
        }), 
        __metadata('design:paramtypes', [])
    ], Chart);
    return Chart;
}());
exports.Chart = Chart;
