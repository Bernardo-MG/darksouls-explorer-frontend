import { Selection, ZoomBehavior } from 'd3';
import { ZoomBinder } from './zoom-binder';

export class NodeZoomBinder implements ZoomBinder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bind(zoom: ZoomBehavior<any, any>): void {
        zoom.on("zoom.node", (event) => {
            this.root.selectAll('circle.node').attr('transform', event.transform);
        })
    }

}