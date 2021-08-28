import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayConfig } from "../displayConfig";
import { DisplayGraphNode } from '../../../models/displayGraphNode';
import * as d3 from 'd3';

export class NodeBuilder implements ElementBuilder {

    config: DisplayConfig;

    root: Selection<any, any, any, any>;

    onSelectNode: Function;

    constructor(root: Selection<any, any, any, any>, config: DisplayConfig, onSelectNode: Function) {
        this.root = root;
        this.config = config;
        this.onSelectNode = onSelectNode;
    }

    public bindToSimulation(simulation: Simulation<any, any>): void {
        simulation.on("tick.nodes", () => {
            this.root.selectAll('.graph_node')
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        });
    }

    public bindToZoom(zoom: ZoomBehavior<any, any>): void { }

    public build(): void {
        this.root.select('#graph_view').selectAll("#graph_nodes_root g")
            .append("circle")
            .attr("class", "graph_node")
            .style("r", this.config.graphRadius)
            .style("stroke", this.config.graphStroke)
            .on("mouseover", this.mouseoverButton as any)
            .on("mouseout", this.mouseoutButton as any)
            .on("click", ((event: any, item: any) => this.onSelectNode(item.id)));
    }

    private mouseoverButton(event: any, d: DisplayGraphNode) {
        d3.select(event.target)
            .style("cursor", "pointer");
    }

    private mouseoutButton(event: any, d: DisplayGraphNode) {
        d3.select(event.target)
            .style("cursor", "default");
    }

}