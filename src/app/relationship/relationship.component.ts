import { Component, Input, OnInit } from '@angular/core';
import { Graph } from '@app/api/models/graph';
import { NamedValue } from '@app/models/namedValue';
import { Item } from '@app/models/item';
import { RelationshipService } from '@app/services/relationship.service';

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
    private relationshipService: RelationshipService
  ) { }

  ngOnInit(): void {
    this.relationshipService.getOptions().subscribe(options => this.filterOptions = options);
  }

  onSelectNode(id: Number) {
    this.relationshipService.getInfo(id).subscribe(data => this.info = data);
  }

  onApplyFilter(options: String[]) {
    if (options.length > 0) {
      this.relationshipService.getGraph(options).subscribe(data => this.graph = data);
    }
  }

}
