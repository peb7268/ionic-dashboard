
import { Component, Input } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';

declare var Chartist: any;
declare var data: any;

//TODO: Explore passing data into this compoonent from dashboard because I still dont think it's 100% right.

@Component({
  selector: 'chart',

  //templateUrl: 'dashboard/dashboard.html',
  inputs: ['data', 'chartType', 'test'],
  template: "\n  <div class='ct-chart ct-perfect-fourth'></div> \n "
})

//TODO: Figure out how to pass the data better using an observable and an event emitter

export class Chart {
  public chartType: String;
  @Input() data: Object;

  constructor() {}

  //Fires on init
  ngOnInit() {}

  ngOnChanges(changes:any):void {
    //console.log('ngOnChanges');
    this.composeBarChart(this.data);
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

  getChartHigh(seriesData, offset){

  }

  getChartLow(seriesData, offset){

  }

  /*
  * To get the stacked effect:
  * There needs to be multiple arrays with the indexes
  * of each overlapping aka:
    
    var seriesData = [
        [-800000, -1200000, 1400000, 1300000],
        [-200000, -1000000, 800000, 1500000]
    ];
    
    Where -8k and -2k correspond to the same bar but stacked.
  
  */
  composeBarChart(resp){
    if(resp.length == 0) return;
    var resp = JSON.parse(resp);

  
    var labels     = this.getLabels(resp.data.concepts);
    //var labels = ['Q1', 'Q2', 'Q3', 'Q4'];

    var seriesData = this.getSeriesData(resp.data);
    // var seriesData = [
    //     [-800000, -1200000, 1400000, 1300000],
    //     [-200000, -1000000, 800000, 1500000]
    // ];

    //TODO: Calculate Net Attraction and plot it in series
    //TODO: Calculate Axis and plot it in labels

    /* 
      Aggregate and sort Chart Data
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    */
    var data: { labels?: string[], series?: any } = { 
      labels: labels,
      series: seriesData
    };

    //Set the options
    var options = {
      // stackBars: true,
      seriesBarDistance: 0,
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

        //Turn this back on to enable labels
        // data.group.elem('text', {
        //   x: data.x1,
        //   y: data.y1,
        //   style: 'text-anchor: middle'
        // }, 'barLabel').text(data.value.x + ', ' + data.value.y);
      }
    });

    chart.on('created', function (data) {
      setTimeout(function(){
        window['App'].loading.destroy();
      }, 3500);
    });
  }
}

