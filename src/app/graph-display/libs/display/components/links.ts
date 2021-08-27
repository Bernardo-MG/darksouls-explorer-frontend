import { DisplayGraph } from '@app/graph-display/models/displayGraph';
import { Selection, BaseType } from 'd3';

import { DisplayGraphLink } from '../../../models/displayGraphLink';
import { DisplayConfig } from '../displayConfig';

export function links(root: Selection<any, any, any, any>,
    graph: DisplayGraph,
    config: DisplayConfig): Selection<BaseType | SVGPathElement, DisplayGraphLink, SVGGElement, unknown> {
    return root.append("g")
        .attr("class", "graph_link_container")
        .selectAll("path")
        .data(graph.links)
        .join("path")
        .attr("class", "graph_link")
        .attr("stroke", d => config.color(d.type))
        .attr("marker-end", d => `url(#arrow-${d.type})`);
}