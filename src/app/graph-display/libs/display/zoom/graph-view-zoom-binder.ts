import { Selection, ZoomBehavior } from 'd3';
import { ZoomBinder } from './zoom-binder';

export class GraphViewZoomBinder implements ZoomBinder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bind(zoom: ZoomBehavior<any, any>): void {
        this.root.select('#graph_view').call(zoom as any);
    }
}