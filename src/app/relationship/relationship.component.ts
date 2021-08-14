import { Component, Input, OnInit } from '@angular/core';
import { Graph } from '@app/models/graph';
import { NamedValue } from '@app/models/namedValue';
import { Item } from '@app/models/item';
import { RelationshipService } from '@app/services/relationship.service';
import { GraphService } from '@app/services/graph.service';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.sass']
})
export class RelationshipComponent implements OnInit {

  filterOptions: NamedValue[] = [];

  graph: Graph = { nodes: [], links: [], types: [] };

  @Input() info: Item = { id: 0, name: '', description: [] };

  constructor(
    private relationshipService: RelationshipService,
    private graphService: GraphService
  ) { }

  ngOnInit(): void {
    this.relationshipService.getOptions().subscribe(options => this.filterOptions = options);
  }

  runQuery(options: String[]) {
    if (options.length > 0) {
      this.graphService.getGraph(options).subscribe(data => this.graph = data);
    }
  }

  onSelectNode(id: Number) {
    this.graphService.getOne(id).subscribe(data => this.info = data);
  }

  onApplyFilter(options: String[]) {
    this.runQuery(options);
  }

}
