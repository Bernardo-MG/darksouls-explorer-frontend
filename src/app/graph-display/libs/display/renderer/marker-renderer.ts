import { ElementRenderer } from "./element-renderer";
import { Selection } from 'd3';
import { DisplayGraph } from "../../../models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class MarkerRenderer implements ElementRenderer {

    config: DisplayConfig;

    graph: DisplayGraph;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig) {
        this.root = root;
        this.graph = graph;
        this.config = config;
    }

    public render(): void {
        // Per-type markers, as they don't inherit styles.
        this.root.select('#graph_view')
            .append("defs")
            .selectAll("marker")
            .data(this.graph.types)
            .join("marker")
            .attr("id", d => `arrow-${d}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -0.5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("fill", this.config.color)
            .attr("d", "M0,-5L10,0L0,5");
    }

}