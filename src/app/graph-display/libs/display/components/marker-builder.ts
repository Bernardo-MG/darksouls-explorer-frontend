import { ElementBuilder } from "./element-builder";
import { Selection, Simulation } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class MarkerBuilder implements ElementBuilder {

    public bindToSimulation(root: Selection<any, any, any, any>, simulation: Simulation<any, any>): void {
    }

    public build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void {
        // Per-type markers, as they don't inherit styles.
        root.select('#graph_view')
            .append("defs")
            .selectAll("marker")
            .data(graph.types)
            .join("marker")
            .attr("id", d => `arrow-${d}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -0.5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("fill", config.color)
            .attr("d", "M0,-5L10,0L0,5");
    }

}