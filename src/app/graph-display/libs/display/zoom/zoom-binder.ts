import { ZoomBehavior } from 'd3';

export interface ZoomBinder {

    bind(zoom: ZoomBehavior<any, any>): void

}