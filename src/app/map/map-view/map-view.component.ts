import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { Map } from '@app/models/map';
import { MapConnection } from '@app/models/mapConnection';
import { Category } from '@app/graph/models/category';
import { Link } from '@app/graph/models/link';
import { Node } from '@app/graph/models/node';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.sass']
})
export class MapViewComponent implements OnInit {

  maps: Map[] = [];

  connections: MapConnection[] = [];
  
  nodes: Node[] = [];

  links: Link[] = [];

  categories: Category[] = [];

  constructor(
    private service: MapService
  ) { }

  ngOnInit(): void {
    this.categories = [{name: 'connected_to'}];
    this.service.getAllMaps().subscribe((data) => this.nodes = data);
    this.service.getAllMapConnections().subscribe((data) => this.links = data);
  }

}
