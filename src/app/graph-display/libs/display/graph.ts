import * as d3 from 'd3';
import { ZoomBehavior, Simulation } from 'd3';

import { EventEmitter } from '@angular/core';

import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from './displayConfig';
import { ElementBuilder } from './builder/element-builder';
import { NodeRootBuilder } from './builder/node-root-builder';
import { NodeBuilder } from './builder/node-builder';
import { NodeLabelBuilder } from './builder/node-label-builder';
import { LinksBuilder } from './builder/link-builder';
import { GraphViewBuilder } from './builder/graph-view-builder';
import { MarkerBuilder } from './builder/marker-builder';

export class GraphRenderer {

    rootSelector: string;

    constructor(selector: string) {
        this.rootSelector = selector;
    }

    public clear() {
        d3.select(this.rootSelector).select(".svg-container").remove();
    }

    public display(graph: DisplayGraph, selectNode: Function, currentZoom: number) {
        const config = new DisplayConfig(graph, currentZoom);
        const simulation = this.buildSimulation(graph, config);
        const zoom = this.buildZoom(config);

        const root = d3.select(this.rootSelector);

        const builders: ElementBuilder[] = [];
        builders.push(new GraphViewBuilder(root, config));
        builders.push(new MarkerBuilder(root, graph, config));
        builders.push(new LinksBuilder(root, graph, config));
        builders.push(new NodeRootBuilder(root, graph));
        builders.push(new NodeBuilder(root, config, selectNode));
        builders.push(new NodeLabelBuilder(root));

        for (let builder of builders) {
            builder.build();
            builder.bindToSimulation(simulation);
            builder.bindToZoom(zoom);
            builder.bindToEvents();
        }

        root.select('#graph_view').call(zoom.transform as any, d3.zoomIdentity.translate(config.width / 10, config.height / 2).scale(config.zoomLevel));
    }

    private buildSimulation(graph: DisplayGraph, config: DisplayConfig): Simulation<any, any> {
        return d3.forceSimulation(graph.nodes)
            .force("link", d3.forceLink(graph.links).id((d: any) => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceRadial(config.width / 2, config.height / 2));
    }

    private buildZoom(config: DisplayConfig): ZoomBehavior<Element, any> {
        return d3.zoom()
            .extent([[0, 0], [config.width, config.height]])
            .scaleExtent([config.minZoom, config.maxZoom]);
    }

}
