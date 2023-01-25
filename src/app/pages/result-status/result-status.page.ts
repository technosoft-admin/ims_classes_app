import { style } from '@angular/animations';
import { Component, HostListener, OnInit, ViewChild} from '@angular/core';
// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexFill,
  ApexAnnotations
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill:ApexFill;
  annotations:ApexAnnotations;
};

@Component({
  selector: 'app-result-status',
  templateUrl: './result-status.page.html',
  styleUrls: ['./result-status.page.scss'],
})
export class ResultStatusPage implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  scrHeight:any;
    scrWidth:any;
    load = false;
    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.scrHeight = window.innerHeight;
          this.scrWidth = window.innerWidth;

          this.chartOptions = {
            series: [
              {
                name: "series2",
                data: [0, 30, 10, 35, 15, 40],
                color: "#090992",
              }
            ],
            chart: {
              height: 180,
              width: this.scrWidth - 25,
              type: "area",
              background: 'transparent'
            },
            xaxis: {
              type: "category",
              categories: [
                "test 1",
                "test 2",
                "test 3",
                "test 4",
                "test 5",
                "test 6"
              ],
            },
            fill: {
              gradient: {
                shade: 'dark',
                gradientToColors: [ '#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              colors: ['transparent'],
            },
           
          };
    }

    // Constructor
    constructor() {
        this.getScreenSize();
    }

 ngOnInit() {
   console.log('data>>', this.chartOptions);
   
   this.onLoader();
  console.log('data>>', this.chartOptions);
 }
 onLoader(){
  this.load = true;
  console.log('this.load1', this.load);
  setTimeout(()=>{
    this.load = false;
  }, 1000);

  console.log('this.load2', this.load);
  
}
  // public lineChartData: ChartDataSets[] = [
  //   { data: [20, 30, 20, 30, 10, 40], label: '' },
  // ];
  // public lineChartLabels: Label[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'];
  // public lineChartOptions: (ChartOptions & { annotation ?: any }) = {
  //   responsive: true,
  //   // scales: {
  //   //   yAxes: [
  //   //     {
  //   //       stacked: true,
  //   //     }
  //   //   ]
  //   // }
  // };
  // public lineChartColors: Color[] = [
  //   {
  //     borderWidth: 0,
  //     backgroundColor: 'rgb(72,72,241)',
  //   },
  // ];
  // public lineChartLegend = true;
  // public lineChartType = 'line';
  // public lineChartPlugins = [];

  // public generateData(baseval, count, yrange) {
  //   var i = 0;
  //   var series = [];
  //   while (i < count) {
  //     var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  //     var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

  //     series.push([x, y, z]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   return series;
  // }
  

}
