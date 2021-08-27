import * as d3 from 'd3';
import { ZoomBehavior, Selection, ScaleOrdinal, Simulation } from 'd3';

import { EventEmitter } from '@angular/core';

import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from './displayConfig';
import { ElementBuilder } from './components/element-builder';
import { NodeRootBuilder } from './components/node-root-builder';
import { NodeBuilder } from './components/node-builder';
import { NodeLabelBuilder } from './components/node-label-builder';
import { LinksBuilder } from './components/link-builder';
import { GraphViewBuilder } from './components/graph-view-builder';
import { MarkerBuilder } from './components/marker-builder';

export function display(graph: DisplayGraph, selectNode = new EventEmitter<Number>(), currentZoom: number) {
    const config = new DisplayConfig(graph, currentZoom, (item: any) => selectNode.emit(item));
    const simulation = buildSimulation(graph, config);
    const zoom = buildZoom(config);

    const rootView = d3.select("figure#graph_container");

    const builders: ElementBuilder[] = [];
    builders.push(new GraphViewBuilder());
    builders.push(new MarkerBuilder());
    builders.push(new LinksBuilder());
    builders.push(new NodeRootBuilder());
    builders.push(new NodeBuilder());
    builders.push(new NodeLabelBuilder());

    for (let builder of builders) {
        builder.build(rootView, graph, config);
        builder.bindToSimulation(rootView, simulation);
        builder.bindToZoom(rootView, zoom);
    }

    rootView.select('#graph_view').call(zoom.transform as any, d3.zoomIdentity.translate(config.width / 10, config.height / 2).scale(config.zoomLevel));
}

function buildSimulation(graph: DisplayGraph, config: DisplayConfig): Simulation<any, any> {
    return d3.forceSimulation(graph.nodes)
        .force("link", d3.forceLink(graph.links).id((d: any) => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceRadial(config.width / 2, config.height / 2));
}

function buildZoom(config: DisplayConfig): ZoomBehavior<Element, any> {
    return d3.zoom()
        .extent([[0, 0], [config.width, config.height]])
        .scaleExtent([config.minZoom, config.maxZoom]);
}
