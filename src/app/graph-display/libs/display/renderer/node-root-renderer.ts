import { ElementRenderer } from "./element-renderer";
import { Selection } from 'd3';

export class NodeRootRenderer implements ElementRenderer {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public render(): void {
        this.root.select('#graph_view').append("g")
            .attr("id", 'nodes_root');
    }

}