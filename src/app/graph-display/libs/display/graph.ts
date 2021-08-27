import * as d3 from 'd3';
import { ZoomBehavior, Selection, ScaleOrdinal } from 'd3';

import { EventEmitter } from '@angular/core';

import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayGraphNode } from '../../models/displayGraphNode';
import { DisplayConfig } from './displayConfig';
import { SimulatorRenderer } from './simulationRenderer';
import { graphView } from './components/graph-view';
import { links } from './components/links';
import { ElementBuilder } from './components/element-builder';
import { NodeRootBuilder } from './components/node-root-builder';
import { NodeBuilder } from './components/node-builder';
import { NodeLabelBuilder } from './components/node-label-builder';
import { LinksBuilder } from './components/links-builder';

var config: DisplayConfig;

export function display(graph: DisplayGraph, selectNode = new EventEmitter<Number>(), currentZoom: number) {
    config = new DisplayConfig(graph, (item: any) => selectNode.emit(item));
    const simulation = new SimulatorRenderer(graph, config);

    const rootView = d3.select("figure#graph_view");

    // Main view container
    const mainView: Selection<any, any, any, any> = graphView(rootView, config);

    const builders: ElementBuilder[] = [];
    builders.push(new LinksBuilder());
    builders.push(new NodeRootBuilder());
    builders.push(new NodeBuilder());
    builders.push(new NodeLabelBuilder());

    for (let builder of builders) {
        builder.build(mainView, graph, config);
    }

    rootView.selectAll('#graph_nodes_root g').call(simulation.drag());
    simulation.bind(rootView.selectAll(".graph_node"), rootView.selectAll('.graph_link'), rootView.selectAll('.graph_node_label'));

    setMarkers(mainView, graph.types, config.color);
    setZoom(mainView, rootView.selectAll('.graph_link'), rootView.selectAll('#graph_nodes_root g'), currentZoom);
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
    link: Selection<any, any, any, any>,
    nodeRoot: Selection<any, any, any, any>,
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
