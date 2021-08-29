import * as d3 from 'd3';
import { ZoomBehavior, Simulation } from 'd3';

import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from './displayConfig';
import { ElementRenderer } from './renderer/element-renderer';
import { NodeRootRenderer } from './renderer/node-root-renderer';
import { NodeRenderer } from './renderer/node-renderer';
import { NodeLabelRenderer } from './renderer/node-label-renderer';
import { LinkRenderer } from './renderer/link-renderer';
import { GraphViewRenderer } from './renderer/graph-view-renderer';
import { MarkerRenderer } from './renderer/marker-renderer';
import { LinkSimulationBinder } from './simulation/link-simulation-binder';
import { SimulationBinder } from './simulation/simulation-binder';
import { NodeLabelSimulationBinder } from './simulation/node-label-simulation-binder';
import { NodeSimulationBinder } from './simulation/node-simulation-binder';
import { EventBinder } from './event/event-binder';
import { NodeEventBinder } from './event/node-event-binder';
import { ZoomBinder } from './zoom/zoom-binder';
import { GraphViewZoomBinder } from './zoom/graph-view-zoom-binder';
import { LinkZoomBinder } from './zoom/link-zoom-binder';
import { NodeZoomBinder } from './zoom/node-zoom-binder';
import { NodeLabelZoomBinder } from './zoom/node-label-zoom-binder';

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

        const renderers: ElementRenderer[] = [];
        renderers.push(new GraphViewRenderer(root, config));
        renderers.push(new MarkerRenderer(root, graph, config));
        renderers.push(new LinkRenderer(root, graph, config));
        renderers.push(new NodeRootRenderer(root));
        renderers.push(new NodeRenderer(root, graph, config));
        renderers.push(new NodeLabelRenderer(root, graph));

        const simBinders: SimulationBinder[] = [];
        simBinders.push(new LinkSimulationBinder(root));
        simBinders.push(new NodeLabelSimulationBinder(root));
        simBinders.push(new NodeSimulationBinder(root));

        const eventBinders: EventBinder[] = [];
        eventBinders.push(new NodeEventBinder(root, selectNode));

        const zoomBinders: ZoomBinder[] = [];
        zoomBinders.push(new GraphViewZoomBinder(root));
        zoomBinders.push(new LinkZoomBinder(root));
        zoomBinders.push(new NodeLabelZoomBinder(root));
        zoomBinders.push(new NodeZoomBinder(root));

        for (let renderer of renderers) {
            renderer.render();
        }

        for (let binder of simBinders) {
            binder.bind(simulation);
        }

        for (let binder of eventBinders) {
            binder.bind();
        }

        for (let binder of zoomBinders) {
            binder.bind(zoom);
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
