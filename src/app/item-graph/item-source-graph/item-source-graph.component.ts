import { Component, Input } from '@angular/core';
import { Graph } from '@app/graph/models/graph';

@Component({
  selector: 'item-source-graph',
  templateUrl: './item-source-graph.component.html',
  styleUrls: ['./item-source-graph.component.sass']
})
export class ItemSourceGraphComponent {

  @Input() graph: Graph = { nodes: [], links: [], categories: [] };

  constructor() { }

}
