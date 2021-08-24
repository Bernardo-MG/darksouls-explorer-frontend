import { Selection, BaseType, ScaleOrdinal } from 'd3';

import { DisplayGraphLink } from '../../../models/displayGraphLink';

export function links(root: Selection<any, any, any, any>,
    color: ScaleOrdinal<String, string, never>,
    links: DisplayGraphLink[]): Selection<BaseType | SVGPathElement, DisplayGraphLink, SVGGElement, unknown> {
    return root.append("g")
        .attr("class", "graph_link_container")
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("class", "graph_link")
        .attr("stroke", d => color(d.type))
        .attr("marker-end", d => `url(#arrow-${d.type})`);
}