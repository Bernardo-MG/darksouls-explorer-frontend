import { ElementBuilder } from "./element-builder";
import { Selection } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";
import { DisplayGraphNode } from '../../../models/displayGraphNode';
import * as d3 from 'd3';

export class NodeBuilder implements ElementBuilder {

    build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void {
        root.select('#graph_view').selectAll("#graph_nodes_root g")
        .append("circle")
        .attr("class", "graph_node")
        .on("mouseover", this.mouseoverButton as any)
        .on("mouseout", this.mouseoutButton as any)
        .on("click", ((event: any, item: any) => config.onSelectNode(item.id)));
    }

    private mouseoverButton(event: any, d: DisplayGraphNode) {
        d3.select(event.target)
            .style("cursor", "pointer")
            .classed("graph_node_selected", true);
    }
    
    private mouseoutButton(event: any, d: DisplayGraphNode) {
        d3.select(event.target)
            .style("cursor", "default")
            .classed("graph_node_selected", false);
    }

}