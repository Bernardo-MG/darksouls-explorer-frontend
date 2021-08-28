import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class NodeLabelBuilder implements ElementBuilder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bindToSimulation(simulation: Simulation<any, any>): void {
        simulation.on("tick.node-labels", () => {
            this.root.selectAll('.graph_node_label')
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });
    }

    public bindToZoom(zoom: ZoomBehavior<any, any>): void { }

    public build(): void {
        this.root.selectAll("#graph_nodes_root g")
            .append("text")
            .attr("class", "graph_node_label")
            .text((d: any) => d.name as string);
    }

}