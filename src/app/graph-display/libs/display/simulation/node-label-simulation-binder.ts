import { Selection, Simulation } from 'd3';
import { SimulationBinder } from './simulation-binder';
import * as d3 from 'd3';

export class NodeLabelSimulationBinder implements SimulationBinder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bind(simulation: Simulation<any, any>): void {
        this.root.selectAll('text.label').call(this.drag(simulation));

        simulation.on("tick.labels", () => {
            this.root.selectAll('text.label')
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });
    }

    private drag(simulation: Simulation<any, any>): any {
        const dragstarted = (event: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        const dragged = (event: any) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        const dragended = (event: any) => {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    }

}