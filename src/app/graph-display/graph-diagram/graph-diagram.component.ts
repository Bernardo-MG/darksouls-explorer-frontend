import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisplayGraphLink } from '../models/displayGraphLink';
import { DisplayGraphNode } from '../models/displayGraphNode';
import * as d3 from 'd3';
import { Simulation, ZoomBehavior, Selection, BaseType, ScaleOrdinal } from 'd3';
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

  height: number = 400;

  width: number = 400;

  minZoom: number = 0.5;

  maxZoom: number = 5;

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
      const color: ScaleOrdinal<String, string, never> = d3.scaleOrdinal(this.graph.types, d3.schemeCategory10)

      // Graph simulation
      const simulation: Simulation<DisplayGraphNode, undefined> = d3.forceSimulation(this.graph.nodes)
        .force("link", d3.forceLink(this.graph.links).id((d: any) => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceRadial(this.width / 2, this.height / 2));

      // Main view container
      var mainView: Selection<SVGSVGElement, unknown, HTMLElement, any> = d3.select("figure#graph_view")
        .append("div")
        .attr("id", "graph")
        .classed("svg-container", true)
        .append("svg")
        .attr("viewBox", `0, 0, ${this.width}, ${this.height}`)
        .classed("svg-content-responsive", true);

      // Builds links
      const link: Selection<BaseType | SVGPathElement, DisplayGraphLink, SVGGElement, unknown> = mainView.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(this.graph.links)
        .join("path")
        .attr("class", "graph_link")
        .attr("stroke", d => color(d.type))
        .attr("marker-end", d => `url(#arrow-${d.type})`);

      // Builds nodes
      // Added after the links so they are drawn over them
      const nodeRoot: Selection<BaseType | SVGGElement, DisplayGraphNode, SVGGElement, unknown> = mainView.append("g")
        .selectAll("g")
        .data(this.graph.nodes)
        .join("g")
        .call(this.drag(simulation) as any);
      const node = nodeRoot.append("circle")
        .attr("class", "graph_node")
        .on("mouseover", this.mouseoverButton)
        .on("mouseout", this.mouseoutButton)
        .on("click", (event, item) => this.selectNode.emit(item.id));
      const nodeLabel = nodeRoot.append("text")
        .text(d => d.name as string);

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

      this.displayGraph(mainView, link, nodeRoot, this.graph.types, this.width, this.height, color);
    }
  }

  private cleanGraph() {
    d3.select("figure#graph_view").select("#graph").remove();
  }

  private displayGraph(mainView: Selection<SVGSVGElement, unknown, HTMLElement, any>,
    link: Selection<BaseType | SVGPathElement, DisplayGraphLink, SVGGElement, unknown>,
    nodeRoot: Selection<BaseType | SVGGElement, DisplayGraphNode, SVGGElement, unknown>,
    types: String[], width: number, height: number, color: ScaleOrdinal<String, string, never>) {

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

    // Adds zoom
    const zoom: ZoomBehavior<Element, any> = d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([this.minZoom, this.maxZoom])
      .on("zoom", (event) => {
        link.attr('transform', event.transform);
        nodeRoot.attr('transform', event.transform);
      });
    mainView.call(zoom as any);
    mainView.call(zoom.transform as any, d3.zoomIdentity.translate(width / 2, height / 2).scale(this.minZoom));
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
