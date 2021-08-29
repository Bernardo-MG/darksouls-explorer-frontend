import { Simulation } from 'd3';

export interface SimulationBinder {

    bind(simulation: Simulation<any, any>): void

}