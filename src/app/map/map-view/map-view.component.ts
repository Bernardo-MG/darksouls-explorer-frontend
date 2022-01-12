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

  graph: Graph = { nodes: [], links: [], categories: [] };

  title: string = "Maps";

  constructor(
    private service: MapService
  ) { }

  ngOnInit(): void {
    this.service.getMapGraph().subscribe((data) => this.graph = data);
  }

}
