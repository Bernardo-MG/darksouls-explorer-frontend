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

  @Input() categories: string[] = [];

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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.categories
      },
      yAxis: {
        type: 'value'
      }
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;

    this.mergeOption = {
      legend: {
        data: this.lines.map(function (l) {
          return l.name;
        })
      },
      xAxis: {
        data: this.categories
      },
      series:  this.lines.map(function (l) {
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
