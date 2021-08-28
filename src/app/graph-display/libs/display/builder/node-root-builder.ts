import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class NodeRootBuilder implements ElementBuilder {

    public bindToSimulation(root: Selection<any, any, any, any>, simulation: Simulation<any, any>): void {
    }

    public bindToZoom(root: Selection<any, any, any, any>, zoom: ZoomBehavior<any, any>): void { }

    public build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void {
        root.select('#graph_view').append("g")
            .attr("id", 'graph_nodes_root')
            .selectAll("g")
            .data(graph.nodes)
            .join("g");
    }

}