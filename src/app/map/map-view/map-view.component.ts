import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { Category } from '@app/graph/models/category';
import { Graph } from '@app/graph/models/graph';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.sass']
})
export class MapViewComponent implements OnInit {

  categories: Category[] = [];

  graph: Graph = { nodes: [], links: [] };

  constructor(
    private service: MapService
  ) { }

  ngOnInit(): void {
    this.categories = [{ name: 'connected_to' }];
    this.service.getMapGraph().subscribe((data) => this.graph = data);
  }

}
