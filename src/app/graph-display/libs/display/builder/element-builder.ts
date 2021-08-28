import { Selection, Simulation, ZoomBehavior } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export interface ElementBuilder {

    bindToSimulation(simulation: Simulation<any, any>): void
    
    bindToZoom(zoom: ZoomBehavior<any, any>): void

    build(): void

}