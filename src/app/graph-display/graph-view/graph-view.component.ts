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
  
  nodes: {
    name: string;
    id: string;
    label: string;
  }[] = [];

  links: {
    source: string;
    target: string;
  }[] = [];

  categories: {
    name: string;
  }[] = [];

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
      this.graphService.getGraph(options).subscribe(graph =>{
        this.graph = graph;
        this.nodes = graph.nodes.map((n) => { return { ...n, name: n.label, id: n.id.toString() } });
        this.links = graph.links.map((l) => { return { source: l.source.toString(), target: l.target.toString() } });
        this.categories = graph.types.map((t) => { return { name: t } });
      });
    }
  }

}
