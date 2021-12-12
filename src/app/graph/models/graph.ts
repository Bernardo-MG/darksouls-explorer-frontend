import { Link } from '../models/link';
import { Node } from '../models/node';
import { Category } from './category';

export interface Graph {
    nodes: Node[],
    links: Link[],
    categories: Category[]
}
