import { Component, OnInit } from '@angular/core';
import { Graph } from '@app/graph/models/graph';
import { MapService } from '../services/map.service';

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
