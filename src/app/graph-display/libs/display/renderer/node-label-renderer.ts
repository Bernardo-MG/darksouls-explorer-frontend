import { ElementRenderer } from "./element-renderer";
import { Selection } from 'd3';

export class NodeLabelRenderer implements ElementRenderer {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public render(): void {
        this.root.selectAll("#graph_nodes_root g")
            .append("text")
            .attr("class", "graph_node_label")
            .text((d: any) => d.name as string);
    }

}