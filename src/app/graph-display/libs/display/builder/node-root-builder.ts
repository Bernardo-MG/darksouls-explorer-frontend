import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class NodeRootBuilder implements ElementBuilder {

    graph: DisplayGraph;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph) {
        this.root = root;
        this.graph = graph;
    }

    public bindToSimulation(simulation: Simulation<any, any>): void {
    }

    public bindToZoom(zoom: ZoomBehavior<any, any>): void { }

    public build(): void {
        this.root.select('#graph_view').append("g")
            .attr("id", 'graph_nodes_root')
            .selectAll("g")
            .data(this.graph.nodes)
            .join("g");
    }

}