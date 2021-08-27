import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export interface ElementBuilder {

    bindToSimulation(root: Selection<any, any, any, any>, simulation: Simulation<any, any>): void
    
    bindToZoom(root: Selection<any, any, any, any>, zoom: ZoomBehavior<any, any>): void

    build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void

}