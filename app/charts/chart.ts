
import { Component, Input, Output, EventEmitter }   from '@angular/core';

import { DataService }                              from '../dashboard/data.service'
import { HttpMock, MockDataService }                from '../mocks';

declare var Chartist: any;

//TODO: Figure out how to pass the data better using an observable and an event emitter
@Component({
  selector: 'chart',
  templateUrl: "build/charts/chart.html",
  providers: [
    MockDataService,
    DataService, 
    HttpMock
  ],
  inputs:  ['data', 'chartType'],
  outputs: ['dataEvent']
})

export class Chart {
  public data: any;
  public chartType: String;
  public changed: boolean = false;
  public instance: any;
  public events: string[] = [];
  public yLabelMinOffset  = 20;

  constructor(public dataService: DataService){    
    this.data = this.dataService.getData(true);
    window['App'].instances.chart = this;
  }

  //Fires on init
  ngOnInit(){}

  ngOnChanges(changes:any):void {
    if(typeof this.data == 'undefined') return;
    this.changed = true;  //for testing - maybe take this out

    if(this.data !== null && typeof this.data == 'object') {
      this.composeChart(this.chartType, this.data);
    }
  }

  throwChartError(){
    console.log('throwing chart error');
  }

  getLabels(concepts){
    var labels = concepts.map(function(concept){
     return concept.name;
    });

    //console.log('labels: ', labels);
    return labels;
  }

  /*
  * Return an array of arrays representing series data
  * TODO: Need to refactor this so it can handle more than vwap charts
  * it should be able to delegate and return series data for multiple types of charts.
  */
  getSeriesData(data){
    var seriesData = [];
    var best_data   = [];
    var worst_data  = [];
    
    for(let i = 0; i < data.concepts.length; i++){
      let cid = data.concepts[i].id;
      
      best_data.push(data.netattraction[cid].best_percent);
      worst_data.push(data.netattraction[cid].worst_percent);
    }
    seriesData.push(best_data, worst_data);

    return seriesData;
  }

  /*
  ** Get the Highest value to be plotted on the chart
  ** plus some offset so the chart doesnt go all the way to the bounds.
  */
  getChartHigh(seriesData, offset){
    var offset = offset || 0;
    var highs  = [Math.max.apply(Math, seriesData[0]), Math.max.apply(Math, seriesData[1])];
    Math.min.apply(Math, highs);
    var high   = Number(highs[0]) + offset;
    
    return high;
  }

  getChartLow(seriesData, offset){
    var offset = offset || 0;
    var lows   = [Math.min.apply(Math, seriesData[0]), Math.min.apply(Math, seriesData[1])];
    var low    = Number(Math.min.apply(Math, lows)) + offset;

    if(low > 0){
      let negatives = lows.filter((num) => {
        return num < 0;
      });

      low = Number(Math.min.apply(Math, negatives)) + offset;
    }

    return low;
  }

  getYLabelVal(yCoord, yVal){
    var offset      = this.getYLabelOffset(yCoord, yVal);
    var yLabelVal   = (yVal > 0) ? yCoord + offset : yCoord - ( offset - 10 );

    return yLabelVal;
  }

  getYLabelOffset(coord, val){
    var offset = (val > 0) ? -5 : -(5);

    return offset;
  }

  //Delegates to whichever specific chart type we are working with
  composeChart(chartType, data){
    var _data = data;
    //console.log('composing a ' + this.chartType + ' chart.');
    window['App'].instances.chart = this;

    if(_data == null) return;

    switch (chartType) {
      case "netattraction":
        var chart     = this.composeBarChart(_data);
        this.instance = chart;
        this.dataService.pushChart(chartType, data, chart); 
      break;
      
      default:
        console.log('default switch matched');  
      break;
    }
  }

  composeBarChart(data){
    var labels     = this.getLabels(data.concepts);
    var seriesData = this.getSeriesData(data);
    
    var _data: { labels?: string[], series?: any } = { 
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
      low:  this.getChartLow(_data.series, -10),
      plugins: [
        // Chartist.plugins.ctPointLabels({
        //   textAnchor: 'middle'
        // })
      ]
    };

    var _chart:any = document.querySelectorAll('.ct-chart');
    if( _chart.length == 0){
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
    chart.on('draw', (data) => {
      //console.log('pushing draw event');
      window['App'].instances.chart.events.push('draw');

      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 50px'
        });

        if(typeof window['App'].instances.chart.getYLabelVal !== 'function') return;

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
      if (data.type === 'bar') {}
    });

    //For changing nav
    chart.on('created', function (data) {
      chart.off('created');
      window['App'].instances.dashboard.dataService.dismissLoader(1500);
    });

    return chart;
  }
}

