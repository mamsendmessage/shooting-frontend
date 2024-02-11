import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {


  chart = new Chart({
    chart: {
      type: 'column',
      inverted: true,
      polar: true
    },
    title: {
      text: ''
    },
    tooltip: {
      outside: true
    },
    pane: {
      size: '85%',
      innerSize: '20%',
      endAngle: 270
    },
    xAxis: {
      tickInterval: 1,
      labels: {
        align: 'right',
        useHTML: true,
        step: 1,
        y: 3,
        style: {
          fontSize: '0px'
        }
      },
      lineWidth: 0,
      categories: [

      ]
    },
    yAxis: {
      crosshair: {
        color: '#000'
      },
      lineWidth: 0,
      tickInterval: 50,
      reversedStacks: false,
      endOnTick: true,
      showLastLabel: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0.20
      }
    },
    legend: { enabled: true },

    exporting: {
      enabled: false
    },




    series: [{
      type: 'column',
      data: [
        { y: 225, color: '#E8673A' },
        { y: 300, color: '#23429B' },
        { y: 363, color: '#78BBDD ' },
      ]

    }]

  });

  constructor() { }

  ngOnInit(): void {
  }

}
