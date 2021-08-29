import { ElementRenderer } from "./element-renderer";
import { Selection } from 'd3';
import { DisplayGraph } from "../../../models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class LinkRenderer implements ElementRenderer {

    config: DisplayConfig;

    graph: DisplayGraph;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig) {
        this.root = root;
        this.graph = graph;
        this.config = config;
    }

    public render(): void {
        this.root.select('#graph_view').append("g")
            .attr("class", "link_container")
            .style("fill", "none")
            .selectAll("path")
            .data(this.graph.links)
            .join("path")
            .attr("class", "link")
            .attr("stroke", d => this.config.color(d.type))
            .attr("marker-end", d => `url(#arrow-${d.type})`)
            .style("stroke-width", this.config.linkStrokeWidth);
    }

}