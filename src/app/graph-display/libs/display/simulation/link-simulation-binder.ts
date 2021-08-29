import { Selection, Simulation } from 'd3';
import { SimulationBinder } from "./simulation-binder";
import * as d3 from 'd3';
import { DisplayGraph } from '@app/graph-display/models/displayGraph';

export class LinkSimulationBinder implements SimulationBinder {

    graph: DisplayGraph;

    root: Selection<any, any, any, any>;

    constructor(root: Selection<any, any, any, any>, graph: DisplayGraph) {
        this.root = root;
        this.graph = graph;
    }

    public bind(simulation: Simulation<any, any>): void {
        simulation.on("tick.links", () => {
            this.root.selectAll('path.link').attr("d", (d) => this.arcPath(true,d));
        });
    }

    private arcPath(leftHand: boolean, d: any) {
        var x1 = leftHand ? d.source.x : d.target.x,
            y1 = leftHand ? d.source.y : d.target.y,
            x2 = leftHand ? d.target.x : d.source.x,
            y2 = leftHand ? d.target.y : d.source.y,
            dx = x2 - x1,
            dy = y2 - y1,
            dr = Math.sqrt(dx * dx + dy * dy),
            drx = dr,
            dry = dr,
            sweep = leftHand ? 0 : 1;
            const siblingCount = this.countSiblingLinks(d.source, d.target);
            const xRotation = 0;
            const largeArc = 0;

            if (siblingCount > 1) {
                var siblings = this.getSiblingLinks(d.source, d.target);
                console.log(siblings);
                var arcScale = d3.scaleOrdinal()
                                        .domain(siblings)
                                        .range([1, siblingCount]);
                const valScale: number = arcScale(d.value) as number;
                drx = drx/(1 + (1/siblingCount) * (valScale - 1));
                dry = dry/(1 + (1/siblingCount) * (valScale - 1));
            }

        return "M" + x1 + "," + y1 + "A" + drx + ", " + dry + " " + xRotation + ", " + largeArc + ", " + sweep + " " + x2 + "," + y2;
    }

    private countSiblingLinks(source: any, target: any) {
        var count = 0;
        for(var i = 0; i < this.graph.links.length; ++i){
            if( (this.graph.links[i].source.id == source.id && this.graph.links[i].target.id == target.id) || (this.graph.links[i].source.id == target.id && this.graph.links[i].target.id == source.id) )
                count++;
        };
        return count;
    };

    private getSiblingLinks(source: any, target: any): string[] {
        var siblings: string[] = [];
        for(var i = 0; i < this.graph.links.length; ++i){
            if( (this.graph.links[i].source.id == source.id && this.graph.links[i].target.id == target.id) || (this.graph.links[i].source.id == target.id && this.graph.links[i].target.id == source.id) )
                siblings.push(this.graph.links[i].type);
        };
        return siblings;
    };

}