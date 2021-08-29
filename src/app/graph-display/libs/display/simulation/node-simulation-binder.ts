import { Selection, Simulation } from 'd3';
import { SimulationBinder } from './simulation-binder';

export class NodeSimulationBinder implements SimulationBinder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bind(simulation: Simulation<any, any>): void {
        simulation.on("tick.nodes", () => {
            this.root.selectAll('circle.node')
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        });
    }

}