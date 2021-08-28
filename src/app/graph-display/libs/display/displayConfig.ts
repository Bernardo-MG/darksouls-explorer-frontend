import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { ScaleOrdinal } from "d3";
import * as d3 from 'd3';

export class DisplayConfig {

    height: number = 400;

    width: number = 400;

    linkStrokeWidth: number = 1.5;

    graphRadius: number = 5;

    graphStroke: string = "#fff";

    minZoom: number = 0.5;

    maxZoom: number = 5;

    color: ScaleOrdinal<String, string, never>;

    zoomLevel: number;

    constructor(graph: DisplayGraph, zoom: number) {
        this.color = d3.scaleOrdinal(graph.types, d3.schemeCategory10)
        this.zoomLevel = zoom;
    }

}
