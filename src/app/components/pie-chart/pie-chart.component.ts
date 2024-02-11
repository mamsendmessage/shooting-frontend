import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {


  chart = new Chart({
    colors: ['#78BBDD', '#23429B', '#E8673A'],

    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Games Type',
      align: 'center',
      verticalAlign: 'middle',
      y: 70
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },



    exporting: {
      enabled: false
    },


    series: [{
      type: 'pie',
      name: 'Games Type',
      innerSize: '50%',
      data: [
        ['Normal', 70],
        ['Special sessions', 13],
        ['Competition', 17],

      ]
    }]
  });

  constructor() { }

  ngOnInit(): void {
  }
}
