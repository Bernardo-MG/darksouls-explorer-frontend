import { ElementBuilder } from "./element-builder";
import { Selection } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class LinksBuilder implements ElementBuilder {

    build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void {
        root.append("g")
            .attr("class", "graph_link_container")
            .selectAll("path")
            .data(graph.links)
            .join("path")
            .attr("class", "graph_link")
            .attr("stroke", d => config.color(d.type))
            .attr("marker-end", d => `url(#arrow-${d.type})`);
    }

}