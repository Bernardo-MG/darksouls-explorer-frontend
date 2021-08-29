import { ElementRenderer } from "./element-renderer";
import { Selection } from 'd3';
import { DisplayGraph } from "../../../models/displayGraph";

export class NodeRootRenderer implements ElementRenderer {

    graph: DisplayGraph;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph) {
        this.root = root;
        this.graph = graph;
    }

    public render(): void {
        this.root.select('#graph_view').append("g")
            .attr("id", 'graph_nodes_root')
            .selectAll("g")
            .data(this.graph.nodes)
            .join("g");
    }

}