import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
    selector: 'app-logarithmic-chart',
    templateUrl: './logarithmic-chart.component.html',
    styleUrls: ['./logarithmic-chart.component.css']
})
export class LogarithmicChartComponent implements OnInit {

    chart = new Chart({
        colors: ['#78BBDD'],

        title: {
            text: '',
        },
    
        xAxis: {
            tickInterval: 1,
            type: 'logarithmic',
            accessibility: {
                rangeDescription: 'Range: 1 to 10'
            }
        },
    
        yAxis: {
            type: 'logarithmic',
            minorTickInterval: 0.1,
            accessibility: {
                rangeDescription: 'Range: 0.1 to 1000'
            }
        },
    
        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: 'x = {point.x}, y = {point.y}'
        },
    
     
        exporting: {
            enabled: false
        },
    
    
        series: [{
            type:'line',
            data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
            pointStart: 1
        }]
    });

    constructor() { }

    ngOnInit(): void {
    }

}
