import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisplayGraph } from '../models/displayGraph';
import * as cytoscape from 'cytoscape';
import { EdgeDefinition, NodeDefinition } from 'cytoscape';
// @ts-ignore
import * as klay from 'cytoscape-klay';

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
    cytoscape.use(klay);
    this.reload();
  }

  ngOnChanges(): void {
    this.reload();
  }

  private reload(): void {
    const nodes: NodeDefinition[] = this.graph.nodes.map(node => { return { data: { id: node.id.toString(), label: node.name } } })
    const links: EdgeDefinition[] = this.graph.links.map(link => { return { data: { source: link.source.toString(), target: link.target.toString() } } })

    var cy = cytoscape({
      container: document.getElementById('graph_container'),

      layout: {
        name: 'klay'
      },
      elements: {
        nodes: nodes,
        edges: links
      },
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            label: "data(label)"
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
