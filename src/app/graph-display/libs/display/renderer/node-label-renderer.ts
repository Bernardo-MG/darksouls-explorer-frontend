import { ElementRenderer } from "./element-renderer";
import { Selection } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";

export class NodeLabelRenderer implements ElementRenderer {

    graph: DisplayGraph;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph) {
        this.root = root;
        this.graph = graph;
    }

    public render(): void {
        this.root.selectAll("#nodes_root")
            .selectAll("text")
            .data(this.graph.nodes)
            .join("text")
            .classed("label", true)
            .text((d: any) => d.name as string);
    }

}