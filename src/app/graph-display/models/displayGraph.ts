import { GraphLink } from "./graphLink";
import { GraphNode } from "./graphNode";

export interface DisplayGraph {
    nodes: GraphNode[],
    links: GraphLink[],
    types: String[]
}
