import { ElementBuilder } from "./element-builder";
import { Selection, Simulation } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class LinksBuilder implements ElementBuilder {

    bindToSimulation(root: Selection<any, any, any, any>, simulation: Simulation<any, any>): void {
        simulation.on("tick.links", () => {
            root.selectAll('.graph_link').attr("d", this.linkArc);
        });
    }

    build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void {
        root.select('#graph_view').append("g")
            .attr("class", "graph_link_container")
            .selectAll("path")
            .data(graph.links)
            .join("path")
            .attr("class", "graph_link")
            .attr("stroke", d => config.color(d.type))
            .attr("marker-end", d => `url(#arrow-${d.type})`);
    }

    private linkArc(d: any) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `;
    }

}