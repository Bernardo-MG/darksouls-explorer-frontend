import { Component, Input, OnInit } from '@angular/core';
import { NamedValue } from '@app/models/namedValue';
import { Item } from '@app/api/models/item';
import { GraphService } from '@app/graph-display/services/graph.service';
import { DisplayGraph } from '@app/graph-display/models/displayGraph';

@Component({
  selector: 'graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.sass']
})
export class GraphViewComponent implements OnInit {

  filterOptions: NamedValue[] = [];

  graph: DisplayGraph = { nodes: [], links: [], types: [] };

  @Input() info: Item = { id: 0, name: '', description: [] };

  constructor(
    private graphService: GraphService
  ) { }

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