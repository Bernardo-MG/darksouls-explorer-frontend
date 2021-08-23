import { DisplayGraphNode } from "@app/graph-display/models/displayGraphNode";
import { ScaleOrdinal, Simulation } from "d3";

export interface DisplayConfig {
    height: number,
    width: number,
    minZoom: number,
    maxZoom: number,
    color?: ScaleOrdinal<String, string, never>,
    simulation?: Simulation<DisplayGraphNode, undefined>
}
