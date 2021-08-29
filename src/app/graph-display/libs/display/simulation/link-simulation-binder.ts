import { Selection, Simulation } from 'd3';
import { SimulationBinder } from "./simulation-binder";

export class LinkSimulationBinder implements SimulationBinder {

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>) {
        this.root = root;
    }

    public bind(simulation: Simulation<any, any>): void {
        simulation.on("tick.links", () => {
            this.root.selectAll('.link').attr("d", this.linkArc);
        });
    }

    private linkArc(d: any) {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `;
    }

}