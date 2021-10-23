import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisplayGraph } from '../models/displayGraph';
import * as cytoscape from 'cytoscape';
import { EdgeDefinition, NodeDefinition } from 'cytoscape';

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
    const nodes: NodeDefinition[] = this.graph.nodes.map(node => { return { data: { id: node.id.toString() } } })
    const links: EdgeDefinition[] = this.graph.links.map(link => { return { data: { source: link.source.toString(), target: link.target.toString() } } })

    var cy = cytoscape({
      container: document.getElementById('graph_container'),

      elements: {
        nodes: nodes,
        edges: links
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

    cy.on("tapstart", "node", (evt) => {
      this.selectNode.emit(evt.target.id());
    });
  }

}
