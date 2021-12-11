import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './map-view/map-view.component';
import { MapService } from './services/map.service';
import { MapRoutingModule } from './map-routing.module';
import { GraphDisplayModule } from '@app/graph-display/graph-display.module';



@NgModule({
  declarations: [
    MapViewComponent
  ],
  imports: [
    MapRoutingModule,
    CommonModule,
    GraphDisplayModule
  ],
  providers: [
    MapService
  ]
})
export class MapModule { }
