import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './map-view/map-view.component';
import { MapService } from './services/map.service';
import { MapRoutingModule } from './map-routing.module';
import { GraphModule } from '@app/graph/graph.module';



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
