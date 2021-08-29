import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphStatusComponent } from './graph-status/graph-status.component';
import { GraphDiagramComponent } from './graph-diagram/graph-diagram.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { FilterModule } from '@app/filter/filter.module';
import { GraphService } from './services/graph.service';

@NgModule({
  declarations: [
    GraphStatusComponent,
    GraphDiagramComponent,
    GraphViewComponent
  ],
  imports: [
    CommonModule,
    FilterModule
  ],
  exports: [
    GraphViewComponent
  ],
  providers: [
    GraphService
  ]
})
export class GraphDisplayModule { }
