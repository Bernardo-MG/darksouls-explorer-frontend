import * as d3 from 'd3';
import { Simulation, ZoomBehavior, Selection, BaseType, ScaleOrdinal } from 'd3';

import { EventEmitter } from '@angular/core';

import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayGraphLink } from '../../models/displayGraphLink';
import { DisplayGraphNode } from '../../models/displayGraphNode';
import { DisplayConfig } from './displayConfig';

const config: DisplayConfig = {
    height: 400,
    width: 400,
    minZoom: 0.5,
    maxZoom: 5
}

export function display(graph: DisplayGraph, selectNode = new EventEmitter<Number>(), currentZoom: number) {
    const color = d3.scaleOrdinal(graph.types, d3.schemeCategory10)

    // Graph simulation
    const simulation = buildSimulation(graph.nodes, graph.links);

    // Main view container
    var mainView = buildMainView();

    // Builds links
    const link = buildLinks(mainView, color, graph.links);

    // Builds nodes
    // Added after the links so they are drawn over them
    const nodeRoot = mainView.append("g")
        .selectAll("g")
        .data(graph.nodes)
        .join("g")
        .call(drag(simulation) as any);
    const node = nodeRoot.append("circle")
        .attr("class", "graph_node")
        .on("mouseover", mouseoverButton)
        .on("mouseout", mouseoutButton)
        .on("click", (event, item) => selectNode.emit(item.id));
    const nodeLabel = nodeRoot.append("text")
        .text(d => d.name as string);

    // Runs simulation
    simulation.on("tick", () => {
        link.attr("d", linkArc);

        node
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y);

        nodeLabel
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y);
    });

    setMarkers(mainView, graph.types, color);
    setZoom(mainView, link, nodeRoot, currentZoom);
}


function buildSimulation(nodes: DisplayGraphNode[], links: DisplayGraphLink[]): Simulation<DisplayGraphNode, undefined> {
    return d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d: any) => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceRadial(config.width / 2, config.height / 2));
}

function buildMainView(): Selection<SVGSVGElement, unknown, HTMLElement, any> {
    return d3.select("figure#graph_view")
        .append("div")
        .attr("id", "graph")
        .classed("svg-container", true)
        .append("svg")
        .attr("viewBox", `0, 0, ${config.width}, ${config.height}`)
        .classed("svg-content-responsive", true);
}

function buildLinks(mainView: Selection<SVGSVGElement, unknown, HTMLElement, any>,
    color: ScaleOrdinal<String, string, never>,
    links: DisplayGraphLink[]): Selection<BaseType | SVGPathElement, DisplayGraphLink, SVGGElement, unknown> {
    return mainView.append("g")
        .attr("class", "graph_link_container")
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("class", "graph_link")
        .attr("stroke", d => color(d.type))
        .attr("marker-end", d => `url(#arrow-${d.type})`);
}

function setMarkers(mainView: Selection<SVGSVGElement, unknown, HTMLElement, any>,
    types: String[], color: ScaleOrdinal<String, string, never>) {
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
}

function setZoom(mainView: Selection<SVGSVGElement, unknown, HTMLElement, any>,
    link: Selection<BaseType | SVGPathElement, DisplayGraphLink, SVGGElement, unknown>,
    nodeRoot: Selection<BaseType | SVGGElement, DisplayGraphNode, SVGGElement, unknown>,
    currentZoom: number) {
    // Adds zoom
    const zoom: ZoomBehavior<Element, any> = d3.zoom()
        .extent([[0, 0], [config.width, config.height]])
        .scaleExtent([config.minZoom, config.maxZoom])
        .on("zoom", (event) => {
            link.attr('transform', event.transform);
            nodeRoot.attr('transform', event.transform);
        });
    mainView.call(zoom as any);
    mainView.call(zoom.transform as any, d3.zoomIdentity.translate(config.width / 10, config.height / 2).scale(currentZoom));
}

function linkArc(d: any) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
      M${d.source.x},${d.source.y}
      A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    `;
}

function drag(simulation: Simulation<DisplayGraphNode, undefined>) {
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

function mouseoverButton(event: any, d: DisplayGraphNode) {
    d3.select(event.target)
        .style("cursor", "pointer")
        .classed("graph_node_selected", true);
}

function mouseoutButton(event: any, d: DisplayGraphNode) {
    d3.select(event.target)
        .style("cursor", "default")
        .classed("graph_node_selected", false);
}
