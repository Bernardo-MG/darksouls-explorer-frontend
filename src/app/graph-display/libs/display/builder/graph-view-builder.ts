import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class GraphViewBuilder implements ElementBuilder {

    public bindToSimulation(root: Selection<any, any, any, any>, simulation: Simulation<any, any>): void { }

    public bindToZoom(root: Selection<any, any, any, any>, zoom: ZoomBehavior<any, any>): void {
        root.select('#graph_view').call(zoom as any);
    }

    public build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void {
        root.append("div")
            .classed("svg-container", true)
            .append("svg")
            .attr("id", "graph_view")
            .attr("viewBox", `0, 0, ${config.width}, ${config.height}`)
            .classed("svg-content-responsive", true);
    }

}