import { ElementRenderer } from "./element-renderer";
import { Selection } from 'd3';
import { DisplayConfig } from "../displayConfig";
import { DisplayGraphNode } from '../../../models/displayGraphNode';
import * as d3 from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";

export class NodeRenderer implements ElementRenderer {

    graph: DisplayGraph;

    config: DisplayConfig;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig) {
        this.root = root;
        this.graph = graph;
        this.config = config;
    }

    public render(): void {
        this.root.select("#nodes_root")
            .selectAll("circle")
            .data(this.graph.nodes)
            .join("circle")
            .classed("node", true)
            .style("r", this.config.graphRadius)
            .style("stroke", this.config.graphStroke)
            .on("mouseover.pointer", this.mouseoverButton as any)
            .on("mouseout.pointer", this.mouseoutButton as any);
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