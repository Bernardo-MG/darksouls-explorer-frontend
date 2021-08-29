import { Selection } from 'd3';
import { EventBinder } from './event-binder';

export class NodeEventBinder implements EventBinder {

    root: Selection<any, any, any, any>;

    onSelectNode: Function;

    constructor(root: Selection<any, any, any, any>, onSelectNode: Function) {
        this.root = root;
        this.onSelectNode = onSelectNode;
    }

    public bind(): void {
        this.root.selectAll("#nodes_root g")
            .on("click", ((event: any, item: any) => this.onSelectNode(item)));
    }

}