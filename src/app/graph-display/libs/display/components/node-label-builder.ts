import { ElementBuilder } from "./element-builder";
import { Selection } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class NodeLabelBuilder implements ElementBuilder {

    build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void {
        root.selectAll("#graph_nodes_root g")
            .append("text")
            .attr("class", "graph_node_label")
            .text((d: any) => d.name as string);
    }

}