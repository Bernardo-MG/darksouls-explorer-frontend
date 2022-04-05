import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GraphModule } from '@app/graph/graph.module';
import { MapRoutingModule } from './map-routing.module';
import { MapViewComponent } from './map-view/map-view.component';
import { MapService } from './services/map.service';



@NgModule({
  declarations: [
    MapViewComponent
  ],
  imports: [
    MapRoutingModule,
    CommonModule,
    GraphModule
  ],
  providers: [
    MapService
  ]
})
export class MapModule { }
