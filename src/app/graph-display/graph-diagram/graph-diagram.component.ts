import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisplayGraph } from '../models/displayGraph';
import * as cytoscape from 'cytoscape';
import { NodeDefinition } from 'cytoscape';

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
    // this.reload();
  }

  private reload(): void {
    const nodes: NodeDefinition[] = this.graph.nodes.map(node => {return {data: { id: node.id.toString() } }})
    const links = this.graph.links.map(link => {return {data: {  source: link.source, target: link.target }}})

    var cy = cytoscape({
      container: document.getElementById('graph_container'),

      elements: {
        nodes: [
          { data: { id: 'A' } },
          { data: { id: 'B' } },
          { data: { id: 'C' } },
          { data: { id: 'D' } },
          { data: { id: 'E' } },
          { data: { id: 'F' } },
          { data: { id: 'G' } },
          { data: { id: 'H' } },
          { data: { id: 'J' } },
          { data: { id: 'K' } },
          { data: { id: 'L' } },
          { data: { id: 'M' } }
        ],
        edges: [
          { data: {  source: 'A', target: 'B' } },
          { data: {  source: 'A', target: 'C' } },
          { data: { source: 'B', target: 'D' } },
          { data: {  source: 'C', target: 'D' } },
          { data: {  source: 'C', target: 'E' } },
          { data: {  source: 'C', target: 'F' } },
          { data: { source: 'D', target: 'G' } },
          { data: { source: 'D', target: 'H' } },
          { data: {  source: 'E', target: 'H' } },
          { data: {  source: 'E', target: 'J' } },
          { data: { source: 'F', target: 'J' } },
          { data: {  source: 'F', target: 'K' } },
          { data: {  source: 'G', target: 'L' } },
          { data: {  source: 'H', target: 'L' } },
          { data: {  source: 'H', target: 'M' } },
          { data: {  source: 'J', target: 'M' } }
        ]
      },
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            width: 44,
            height: 44,
          }
        },

        {
          selector: 'edge',
          style: {
            width: 4,
            opacity: 0.4
          }
        }
      ]
    });
    cy.center();
  }

}
