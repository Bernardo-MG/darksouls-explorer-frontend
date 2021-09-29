import { Component, OnInit } from '@angular/core';
import { NamedValue } from '@app/models/namedValue';
import { Info } from '@app/api/models/info';
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

  info: Info = { id: 0, name: '', description: [] };

  initialZoom: number = 0.75;

  currentZoom: number = 0;

  constructor(
    private graphService: GraphService
  ) {
    this.currentZoom = this.initialZoom;
  }

  ngOnInit(): void {
    this.graphService.getOptions().subscribe(options => this.filterOptions = options);
  }

  onSelectNode(id: Number) {
    this.graphService.getInfo(id).subscribe(data => this.info = data);
  }

  onApplyFilter(options: String[]) {
    if (options.length > 0) {
      this.currentZoom = this.initialZoom;
      this.graphService.getGraph(options).subscribe(data => this.graph = data);
    }
  }

  onIncreaseZoom() {
    this.currentZoom = this.currentZoom + 0.2;
  }

  onDecreaseZoom() {
    this.currentZoom = this.currentZoom - 0.2;
  }

}
