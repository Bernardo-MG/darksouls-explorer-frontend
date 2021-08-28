import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";
import { DisplayGraphNode } from '../../../models/displayGraphNode';
import * as d3 from 'd3';

export class NodeBuilder implements ElementBuilder {

    config: DisplayConfig;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, config: DisplayConfig) {
        this.root = root;
        this.config = config;
    }

    public bindToSimulation(simulation: Simulation<any, any>): void {
        simulation.on("tick.nodes", () => {
            this.root.selectAll('.graph_node')
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        });

        this.root.selectAll('#graph_nodes_root g').call(this.drag(simulation));
    }

    public bindToZoom(zoom: ZoomBehavior<any, any>): void {
        zoom.on("zoom.node", (event) => {
            this.root.selectAll('#graph_nodes_root g').attr('transform', event.transform);
        })
    }

    public build(): void {
        this.root.select('#graph_view').selectAll("#graph_nodes_root g")
            .append("circle")
            .attr("class", "graph_node")
            .style("r", this.config.graphRadius)
            .style("stroke", this.config.graphStroke)
            .on("mouseover", this.mouseoverButton as any)
            .on("mouseout", this.mouseoutButton as any)
            .on("click", ((event: any, item: any) => this.config.onSelectNode(item.id)));
    }

    private mouseoverButton(event: any, d: DisplayGraphNode) {
        d3.select(event.target)
            .style("cursor", "pointer");
    }

    private mouseoutButton(event: any, d: DisplayGraphNode) {
        d3.select(event.target)
            .style("cursor", "default");
    }

    private drag(simulation: Simulation<any, any>): any {
        const dragstarted = (event: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        const dragged = (event: any) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        const dragended = (event: any) => {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    }

}