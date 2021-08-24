import * as d3 from 'd3';
import { ZoomBehavior, Selection, BaseType, ScaleOrdinal } from 'd3';

import { EventEmitter } from '@angular/core';

import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayGraphLink } from '../../models/displayGraphLink';
import { DisplayGraphNode } from '../../models/displayGraphNode';
import { DisplayConfig } from './displayConfig';
import { SimulatorRenderer } from './simulationRenderer';
import { graphView } from './components/graph-view';
import { links } from './components/links';

var config: DisplayConfig;

export function display(graph: DisplayGraph, selectNode = new EventEmitter<Number>(), currentZoom: number) {
    config = new DisplayConfig(graph);
    const simulation = new SimulatorRenderer(graph, config);

    const rootView = d3.select("figure#graph_view");

    // Main view container
    const mainView = graphView(rootView, config);
    // Builds links
    const link = links(mainView, config.color, graph.links);
    // Builds nodes
    // Added after the links so they are drawn over them
    const nodes = buildNodeView(mainView, graph.nodes, selectNode);

    nodes.nodeRoot.call(simulation.drag());
    simulation.bind(nodes.node, link, nodes.nodeLabel);

    setMarkers(mainView, graph.types, config.color);
    setZoom(mainView, link, nodes.nodeRoot, currentZoom);
}

function buildNodeView(mainView: any, nodes: DisplayGraphNode[], selectNode = new EventEmitter<Number>()): any {
    const nodeRoot = mainView.append("g")
        .selectAll("g")
        .data(nodes)
        .join("g");
    const node = nodeRoot.append("circle")
        .attr("class", "graph_node")
        .on("mouseover", mouseoverButton)
        .on("mouseout", mouseoutButton)
        .on("click", ((event: any, item: any) => selectNode.emit(item.id)));
    const nodeLabel = nodeRoot.append("text")
        .text((d: any) => d.name as string);

    return { nodeRoot, node, nodeLabel };
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
