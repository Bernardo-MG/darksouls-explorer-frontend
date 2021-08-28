import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import * as d3 from "d3";

export class NodeRootBuilder implements ElementBuilder {

    graph: DisplayGraph;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph) {
        this.root = root;
        this.graph = graph;
    }

    public bindToSimulation(simulation: Simulation<any, any>): void {
        this.root.selectAll('#graph_nodes_root g').call(this.drag(simulation));
    }

    public bindToZoom(zoom: ZoomBehavior<any, any>): void {
        zoom.on("zoom.node", (event) => {
            this.root.selectAll('#graph_nodes_root g').attr('transform', event.transform);
        })
    }

    public build(): void {
        this.root.select('#graph_view').append("g")
            .attr("id", 'graph_nodes_root')
            .selectAll("g")
            .data(this.graph.nodes)
            .join("g");
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