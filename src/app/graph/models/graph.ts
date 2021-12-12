import { Link } from '../models/link';
import { Node } from '../models/node';

export interface Graph {
    nodes: Node[],
    links: Link[]
}
