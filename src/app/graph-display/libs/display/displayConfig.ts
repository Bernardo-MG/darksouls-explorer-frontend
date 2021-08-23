import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayGraphNode } from "@app/graph-display/models/displayGraphNode";
import { ScaleOrdinal, Simulation } from "d3";
import * as d3 from 'd3';
import { DisplayGraphLink } from "@app/graph-display/models/displayGraphLink";

export class DisplayConfig {

    height: number = 400;

    width: number = 400;

    minZoom: number = 0.5;

    maxZoom: number = 5;

    color: ScaleOrdinal<String, string, never>;

    simulation: Simulation<DisplayGraphNode, undefined>;

    constructor(graph: DisplayGraph) {
        this.color = d3.scaleOrdinal(graph.types, d3.schemeCategory10)

        // Graph simulation
        this.simulation = this.buildSimulation(graph.nodes, graph.links);
    }

    private buildSimulation(nodes: DisplayGraphNode[], links: DisplayGraphLink[]): Simulation<DisplayGraphNode, undefined> {
        return d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d: any) => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceRadial(this.width / 2, this.height / 2));
    }
    
}
