import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Line } from '../models/line';

@Component({
  selector: 'chart-stacked',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.sass']
})
export class StackedChartComponent implements OnChanges {

  options = {};

  mergeOption: any;

  loading = false;

  @Input() title: string = '';

  @Input() scale: string[] = [];

  @Input() lines: Line[] = [];

  constructor() {
    this.options = {
      title: {
        text: this.title
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this.lines.map(function (a) {
          return a.name;
        })
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.scale
      },
      yAxis: {
        type: 'value'
      }
    };
  }

  ngOnChanges(): void {
    this.loading = true;

    this.mergeOption = {
      legend: {
        data: this.lines.map(function (l) {
          return l.name;
        })
      },
      xAxis: {
        data: this.scale
      },
      series: this.lines.map(function (l) {
        return {
          name: l.name,
          type: 'line',
          data: l.data
        };
      })
    };

    this.loading = false;
  }

}
