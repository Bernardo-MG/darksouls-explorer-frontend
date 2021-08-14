import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisplayGraphLink } from '../models/displayGraphLink';
import { DisplayGraphNode } from '../models/displayGraphNode';
import * as d3 from 'd3';
import { Simulation, SimulationNodeDatum, ZoomBehavior } from 'd3';
import { DisplayGraph } from '../models/displayGraph';

@Component({
  selector: 'graph-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graph-diagram.component.html',
  styleUrls: ['./graph-diagram.component.sass']
})
export class GraphDiagramComponent implements OnInit, OnChanges {

  @Input() graph: DisplayGraph = { nodes: [], links: [], types: [] };

  @Output() selectNode = new EventEmitter<Number>();

  height = 400;

  width = 400;

  constructor() { }

  ngOnInit(): void {
    this.cleanGraph();
    if (this.graph) {
      this.displayGraph(this.graph.links, this.graph.nodes, this.graph.types, this.width, this.height);
    }
  }

  ngOnChanges(): void {
    this.cleanGraph();
    if (this.graph) {
      this.displayGraph(this.graph.links, this.graph.nodes, this.graph.types, this.width, this.height);
    }
  }

  private cleanGraph() {
    d3.select("figure#graph_view").select("#graph").remove();
  }

  private displayGraph(links: DisplayGraphLink[], nodes: DisplayGraphNode[], types: String[], width: number, height: number) {
    const color = d3.scaleOrdinal(types, d3.schemeCategory10)

    // Graph simulation
    const simulation: Simulation<DisplayGraphNode, undefined> = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceRadial(width / 2, height / 2));

    // Main view container
    var mainView = d3.select("figure#graph_view")
      .append("div")
      .attr("id", "graph")
      .classed("svg-container", true)
      .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`)
      .classed("svg-content-responsive", true);

    // Per-type markers, as they don't inherit styles.
    mainView.append("defs").selectAll("marker")
      .data(types)
      .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", color)
      .attr("d", "M0,-5L10,0L0,5");

    // Builds links
    const link = mainView.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("class", "graph_link")
      .attr("stroke", d => color(d.type))
      .attr("marker-end", d => `url(#arrow-${d.type})`);

    // Builds nodes
    // Added after the links so they are drawn over them
    const nodeRoot = mainView.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(this.drag(simulation) as any);
    const node = nodeRoot.append("circle")
      .attr("class", "graph_node")
      .on("mouseover", this.mouseoverButton)
      .on("mouseout", this.mouseoutButton)
      .on("click", (event, item) => this.selectNode.emit(item.id));
    const nodeLabel = nodeRoot.append("text")
      .text(d => d.name as string);

    // Adds zoom
    const zoom: ZoomBehavior<Element, any> = d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        link.attr('transform', event.transform);
        nodeRoot.attr('transform', event.transform);
      });
    mainView.call(zoom as any);
    mainView.call(zoom.transform as any, d3.zoomIdentity.translate(100, 50).scale(0.5));

    // Runs simulation
    simulation.on("tick", () => {
      link.attr("d", this.linkArc);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      nodeLabel
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });
  }

  private linkArc(d: any) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
      M${d.source.x},${d.source.y}
      A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    `;
  }

  private drag(simulation: Simulation<DisplayGraphNode, undefined>) {
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
  }

  private mouseoverButton(event: any, d: DisplayGraphNode) {
    d3.select(event.target)
      .style("cursor", "pointer")
      .classed("graph_node_selected", true);
  }

  private mouseoutButton(event: any, d: DisplayGraphNode) {
    d3.select(event.target)
      .style("cursor", "default")
      .classed("graph_node_selected", false);
  }

}
