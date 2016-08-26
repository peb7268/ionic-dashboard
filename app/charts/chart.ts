
import { Component, Input, Output, EventEmitter }   from '@angular/core';
import { NavController, Loading }                   from 'ionic-angular';

import { DataService }                              from '../dashboard/data.service'

declare var Chartist: any;

//TODO: Figure out how to pass the data better using an observable and an event emitter
@Component({
  selector: 'chart',
  templateUrl: "build/charts/chart.html",

  inputs:  ['data', 'chartType'],
  outputs: ['dataEvent']
})

export class Chart {
  public data: any;
  public chartType: String;

  constructor(public dataService: DataService){
    console.log('Chart:constructor');
    this.data = this.dataService.getData();
  }

  //Fires on init
  ngOnInit() { console.log('ngOnInit: this.data: ', this.data); }

  ngOnChanges(changes:any):void {
    console.log('Chart:ngOnChanges: this.data: ', this.data);

    if(typeof this.data == 'undefined') return;
    
    if(this.data !== null && typeof this.data == 'object') {
      this.composeChart(this.chartType, this.data.data);
    }
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
  getSeriesData(vwapData){
    var seriesData = [];
    
    var best_data   = [];
    var worst_data  = [];
    
    for(let concept_id in vwapData.best_count){
      best_data.push(vwapData.best_count[concept_id][0]);
      worst_data.push(vwapData.worst_count[concept_id][0]);
    }
    seriesData.push(best_data, worst_data);

    return seriesData;
  }

  /*
  ** Get the Highest value to be plotted on the chart
  ** plus some offset so the chart doesnt go all the way to the bounds.
  */
  getChartHigh(seriesData, offset){}

  getChartLow(seriesData, offset){}

  getYLabelVal(yCoord, yVal){
    var offset      = 20;
    var yLabelVal   = (yVal > 0) ? yCoord + offset : yCoord - ( offset - 10 );

    return yLabelVal;
  }

  //Delegates to whichever specific chart type we are working with
  composeChart(chartType, data){
    console.log('composing a ' + this.chartType + ' chart.');
    window['App'].klass = this;

    if(data == null) return;

    switch (chartType) {
      case "netattraction":
        var chart     = this.composeBarChart(data);
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
      high: 50,
      low: -50,
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
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 50px'
        });

        if(typeof window['App'].klass.getYLabelVal !== 'function') return;

        /* Bar labels //
        ** data.value.y: The value that is being demonstrated on the graph
        ** data.y1 / data.y2: The points to plot the bars on the graph ( start and stop of the bar ) */
        var xVal = data.x1;
        var yVal = window['App'].klass.getYLabelVal(data.y2, data.value.y);

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
      setTimeout(function(){
        window['App'].loading.destroy();
        window.dispatchEvent(new Event('resize'));
      }, 500);
    });

    return chart;
  }
}

