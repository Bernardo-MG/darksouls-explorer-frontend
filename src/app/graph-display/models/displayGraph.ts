import { DisplayGraphLink } from "./displayGraphLink";
import { DisplayGraphNode } from "./displayGraphNode";

export interface DisplayGraph {
    nodes: DisplayGraphNode[],
    links: DisplayGraphLink[],
    types: string[]
}
