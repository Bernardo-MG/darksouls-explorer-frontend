import { Selection } from 'd3';
import { DisplayConfig } from "../displayConfig";

export function graphView(
    root: Selection<any, any, any, any>,
    config: DisplayConfig
    ): Selection<any, any, any, any> {
    return root.append("div")
        .attr("id", "graph")
        .classed("svg-container", true)
        .append("svg")
        .attr("viewBox", `0, 0, ${config.width}, ${config.height}`)
        .classed("svg-content-responsive", true);
}