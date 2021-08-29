import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "../../../models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export class LinksBuilder implements ElementBuilder {

    config: DisplayConfig;

    graph: DisplayGraph;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig) {
        this.root = root;
        this.graph = graph;
        this.config = config;
    }

    public bindToEvents(): void { }

    public bindToSimulation(simulation: Simulation<any, any>): void {
        simulation.on("tick.links", () => {
            this.root.selectAll('.graph_link').attr("d", this.linkArc);
        });
    }

    public bindToZoom(zoom: ZoomBehavior<any, any>): void {
        zoom.on("zoom.link", (event) => {
            this.root.selectAll('.graph_link').attr('transform', event.transform);
        })
    }

    public build(): void {
        this.root.select('#graph_view').append("g")
            .attr("class", "graph_link_container")
            .style("fill", "none")
            .selectAll("path")
            .data(this.graph.links)
            .join("path")
            .attr("class", "graph_link")
            .attr("stroke", d => this.config.color(d.type))
            .attr("marker-end", d => `url(#arrow-${d.type})`)
            .style("stroke-width", this.config.linkStrokeWidth);
    }

    private linkArc(d: any) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `;
    }

}