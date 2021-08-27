import { ElementBuilder } from "./element-builder";
import { Selection, Simulation } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class NodeLabelBuilder implements ElementBuilder {

    bindToSimulation(root: Selection<any, any, any, any>, simulation: Simulation<any, any>): void {
        simulation.on("tick.node-labels", () => {
            root.selectAll('.graph_node_label')
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });
    }

    build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void {
        root.select('#graph_view').selectAll("#graph_nodes_root g")
            .append("text")
            .attr("class", "graph_node_label")
            .text((d: any) => d.name as string);
    }

}