import { ElementBuilder } from "./element-builder";
import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayConfig } from "../displayConfig";

export class GraphViewBuilder implements ElementBuilder {

    config: DisplayConfig;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, config: DisplayConfig) {
        this.root = root;
        this.config = config;
    }

    public bindToSimulation(simulation: Simulation<any, any>): void { }

    public bindToZoom(zoom: ZoomBehavior<any, any>): void {
        this.root.select('#graph_view').call(zoom as any);
    }

    public build(): void {
        this.root.append("div")
            .classed("svg-container", true)
            .append("svg")
            .attr("id", "graph_view")
            .attr("viewBox", `0, 0, ${this.config.width}, ${this.config.height}`)
            .classed("svg-content-responsive", true);
    }

}