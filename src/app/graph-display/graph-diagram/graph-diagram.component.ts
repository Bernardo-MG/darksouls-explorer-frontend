import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Graph } from '../models/graph';

@Component({
  selector: 'graph-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graph-diagram.component.html',
  styleUrls: ['./graph-diagram.component.sass']
})
export class GraphDiagramComponent implements OnChanges {

  @Input() graph: Graph = { nodes: [], links: [], types: [] };

  @Output() selectNode = new EventEmitter<Number>();

  options = {};

  mergeOption: any;

  loading = false;

  constructor() { }

  onClick(event: any): void {
    this.selectNode.emit(event.data.id);
  }

  ngOnChanges(): void {
    this.loading = true;

    this.mergeOption = {
      series: {
        type: 'graph',
        layout: 'force',
        roam: true,
        label: {
          position: 'right'
        },
        force: {
          repulsion: 100
        },
        data: this.graph.nodes.map((n) => { return { ...n, name: n.label, id: n.id.toString() } }),
        links: this.graph.links.map((l) => { return { source: l.source.toString(), target: l.target.toString() } }),
        categories: this.graph.types.map((t) => { return { name: t } })
      }
    };

    this.loading = false;
  }

}
