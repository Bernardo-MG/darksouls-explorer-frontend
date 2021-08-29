import { Selection, Simulation } from 'd3';
import { SimulationBinder } from './simulation-binder';

export class NodeLabelSimulationBinder implements SimulationBinder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bind(simulation: Simulation<any, any>): void {
        simulation.on("tick.node-labels", () => {
            this.root.selectAll('.graph_node_label')
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });
    }

}