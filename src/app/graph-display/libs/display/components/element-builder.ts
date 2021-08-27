import { Selection } from 'd3';
import { DisplayGraph } from "@app/graph-display/models/displayGraph";
import { DisplayConfig } from "../displayConfig";

export interface ElementBuilder {

    build(root: Selection<any, any, any, any>, graph: DisplayGraph, config: DisplayConfig): void

}