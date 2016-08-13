
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

  constructor(){}

  //Fires on init
  ngOnInit() {
    var data     = localStorage.getItem('project_data');
    var haveData = typeof data !== 'undefined';

    if(haveData) this.data = data;
    if(haveData) { 
      this.composeBarChart(this.data);
    } else {
      alert('oops there was an error loading your chart.');
    }
  }

  ngOnChanges(changes:any):void {}

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

  composeBarChart(resp){
    window['App'].klass = this;

    if(resp == null)     return;
    if(resp.length == 0) return;
    var resp = JSON.parse(resp);

    var labels     = this.getLabels(resp.data.concepts);
    var seriesData = this.getSeriesData(resp.data);
    
    var data: { labels?: string[], series?: any } = { 
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

    //Instantiate the chart
    var chart = new Chartist.Bar('.ct-chart', {
      labels: data.labels,
      series: data.series
    }, options);

    //Add Custom labels
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 50px'
        });

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
      }, 3500);
    });
  }
}

