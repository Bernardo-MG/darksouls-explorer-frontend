import { Simulation, ZoomBehavior } from 'd3';

export interface ElementBuilder {

    bindToSimulation(simulation: Simulation<any, any>): void
    
    bindToZoom(zoom: ZoomBehavior<any, any>): void

    build(): void

}