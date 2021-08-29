import { Selection, ZoomBehavior } from 'd3';
import { ZoomBinder } from './zoom-binder';

export class LinkZoomBinder implements ZoomBinder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bind(zoom: ZoomBehavior<any, any>): void {
        zoom.on("zoom.link", (event) => {
            this.root.selectAll('.link').attr('transform', event.transform);
        })
    }

}