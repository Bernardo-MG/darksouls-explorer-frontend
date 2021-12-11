import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { Map } from '@app/models/map';
import { MapConnection } from '@app/models/mapConnection';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.sass']
})
export class MapViewComponent implements OnInit {

  maps: Map[] = [];

  connections: MapConnection[] = [];
  
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

  constructor(
    private service: MapService
  ) { }

  ngOnInit(): void {
    this.categories = [{name: 'connected_to'}];
    this.service.getAllMaps().subscribe((data) => this.nodes = data.content.map((n) => { return { label: n.name, name: n.name, id: n.id.toString() } }));
    this.service.getAllMapConnections().subscribe((data) => this.links = data.content.map((l) => { return { source: l.id.toString(), target: l.connection.toString() } }));
  }

}
