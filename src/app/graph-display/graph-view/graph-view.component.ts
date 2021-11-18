import { Component, OnInit } from '@angular/core';
import { NamedValue } from '@app/models/namedValue';
import { Info } from '../models/info';
import { GraphService } from '../services/graph.service';
import { Graph } from '../models/graph';

@Component({
  selector: 'graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.sass']
})
export class GraphViewComponent implements OnInit {

  filterOptions: NamedValue[] = [];

  graph: Graph = { nodes: [], links: [], types: [] };

  info: Info = { id: '0', label: '', description: [] };

  constructor(
    private graphService: GraphService
  ) {}

  ngOnInit(): void {
    this.graphService.getOptions().subscribe(options => this.filterOptions = options);
  }

  onSelectNode(id: Number) {
    this.graphService.getInfo(id).subscribe(data => this.info = data);
  }

  onApplyFilter(options: String[]) {
    if (options.length > 0) {
      this.graphService.getGraph(options).subscribe(data => this.graph = data);
    }
  }

}
