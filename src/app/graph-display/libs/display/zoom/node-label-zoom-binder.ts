import { Selection, ZoomBehavior } from 'd3';
import { ZoomBinder } from './zoom-binder';

export class NodeLabelZoomBinder implements ZoomBinder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bind(zoom: ZoomBehavior<any, any>): void {
        zoom.on("zoom.label", (event) => {
            this.root.selectAll('text.label').attr('transform', event.transform);
        })
    }

}