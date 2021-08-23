import { Simulation } from "d3";
import * as d3 from 'd3';

import { DisplayGraphLink } from "@app/graph-display/models/displayGraphLink";
import { DisplayGraphNode } from "@app/graph-display/models/displayGraphNode";
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "./displayConfig";

export class SimulatorRenderer {

    simulation: Simulation<DisplayGraphNode, undefined>;

    constructor(graph: DisplayGraph, config: DisplayConfig) {
        // Graph simulation
        this.simulation = d3.forceSimulation(graph.nodes)
            .force("link", d3.forceLink(graph.links).id((d: any) => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceRadial(config.width / 2, config.height / 2));
    }

    public bind(node: any, link: any, nodeLabel: any) {
        this.simulation.on("tick", () => {
            link.attr("d", this.linkArc);

            node
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);

            nodeLabel
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });
    }

    public drag(): any {
        const dragstarted = (event: any) => {
            if (!event.active) this.simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        const dragged = (event: any) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        const dragended = (event: any) => {
            if (!event.active) this.simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    }

    private linkArc(d: any) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `;
    }

}