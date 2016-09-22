
import { Component, Input } from '@angular/core';

declare var Chartist: any;
declare var data: any;

@Component({
  selector: 'chart',
  template: "\n  <div class='ct-chart ct-perfect-fourth'></div> \n "
  //templateUrl: 'dashboard/dashboard.html'
})

export class Netattraction {
  constructor(){
    console.log('hello Netattraction');
  }

  ngOnInit(){
    console.log('init');
    new Chartist.Bar('.ct-chart', {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        [800000, 1200000, 1400000, 1300000],
        [200000, 400000, 500000, 300000],
        [100000, 200000, 400000, 600000]
      ]
    }, {
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 1000) + 'k';
        }
      }
    }).on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 30px'
        });
      }
    });
  }
}

