import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { DisplayGraph } from '../models/displayGraph';
import { display } from '../libs/display/graph'

@Component({
  selector: 'graph-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graph-diagram.component.html',
  styleUrls: ['./graph-diagram.component.sass']
})
export class GraphDiagramComponent implements OnInit, OnChanges {

  @Input() graph: DisplayGraph = { nodes: [], links: [], types: [] };

  @Output() selectNode = new EventEmitter<Number>();

  @Input() currentZoom: number = 0.75;

  constructor() { }

  ngOnInit(): void {
    this.reload();
  }

  ngOnChanges(): void {
    this.reload();
  }

  private reload(): void {
    this.cleanGraph();
    if (this.graph) {
      display(this.graph, this.selectNode, this.currentZoom);
    }
  }

  private cleanGraph() {
    d3.select("figure#graph_container").select(".svg-container").remove();
  }

}
