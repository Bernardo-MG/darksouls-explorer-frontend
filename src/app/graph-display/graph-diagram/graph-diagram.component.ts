import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisplayGraph } from '../models/displayGraph';
import { EChartsOption, GraphSeriesOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'graph-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graph-diagram.component.html',
  styleUrls: ['./graph-diagram.component.sass']
})
export class GraphDiagramComponent implements OnInit, OnChanges {

  @Input() graph: DisplayGraph = { nodes: [], links: [], types: [] };

  @Output() selectNode = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {
    this.reload();
  }

  ngOnChanges(): void {
    this.reload();
  }

  private reload(): void {
    var chartDom = document.getElementById('graph_container');
    var myChart = echarts.init(chartDom as HTMLElement);

    myChart.setOption({
      series:
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        label: {
          position: 'right'
        },
        force: {
          repulsion: 100
        },
        data: this.graph.nodes,
        links: this.graph.links,
        categories: this.graph.types.map((l) => { return { name: l } })
      }
    });
  }

}
