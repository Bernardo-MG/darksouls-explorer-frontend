import { Component, Input } from '@angular/core';
import { DisplayGraph } from '../models/displayGraph';

@Component({
  selector: 'graph-status',
  templateUrl: './graph-status.component.html',
  styleUrls: ['./graph-status.component.sass']
})
export class GraphStatusComponent {

  @Input() graph: DisplayGraph = { nodes: [], links: [], types: [] };

  constructor() { }

}
