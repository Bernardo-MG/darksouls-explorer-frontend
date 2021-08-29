import { ElementRenderer } from "./element-renderer";
import { Selection } from 'd3';
import { DisplayConfig } from "../displayConfig";

export class GraphViewRenderer implements ElementRenderer {

    config: DisplayConfig;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, config: DisplayConfig) {
        this.root = root;
        this.config = config;
    }

    public render(): void {
        this.root.append("div")
            .classed("svg-container", true)
            .append("svg")
            .attr("id", "graph_view")
            .attr("viewBox", `0, 0, ${this.config.width}, ${this.config.height}`)
            .classed("svg-content-responsive", true);
    }

}