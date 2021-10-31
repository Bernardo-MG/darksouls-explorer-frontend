import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisplayGraph } from '../models/displayGraph';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'graph-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graph-diagram.component.html',
  styleUrls: ['./graph-diagram.component.sass']
})
export class GraphDiagramComponent implements OnInit, OnChanges {

  @Input() graph: DisplayGraph = { nodes: [], links: [], types: [] };

  @Output() selectNode = new EventEmitter<Number>();

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
    this.reload();
  }

  ngOnChanges(): void {
    this.reload();
  }

  private reload(): void {
    //const nodes: NodeDefinition[] = this.graph.nodes.map(node => { return { data: { id: node.id.toString(), label: node.name } } })
    //const links: EdgeDefinition[] = this.graph.links.map(link => { return { data: { source: link.source.toString(), target: link.target.toString() } } })

    //cytoscape.use(klay);
    //var cy = cytoscape({
    //  container: document.getElementById('graph_container'),
//
    //  layout: {
    //    name: 'klay'
    //  },
    //  elements: {
    //    nodes: nodes,
    //    edges: links
    //  },
    //  style: [ // the stylesheet for the graph
    //    {
    //      selector: 'node',
    //      style: {
    //        label: "data(label)"
    //      }
    //    }
    //  ]
    //});
    //cy.center();

    //cy.on("tapstart", "node", (evt) => {
    //  this.selectNode.emit(evt.target.id());
    //});
  }

}
