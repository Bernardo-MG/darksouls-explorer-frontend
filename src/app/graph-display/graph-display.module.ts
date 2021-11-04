import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { GraphStatusComponent } from './graph-status/graph-status.component';
import { GraphDiagramComponent } from './graph-diagram/graph-diagram.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { FilterModule } from '@app/filter/filter.module';
import { GraphService } from './services/graph.service';
import { GraphDisplayRoutingModule } from './graph-display-routing.module';

@NgModule({
  declarations: [
    GraphStatusComponent,
    GraphDiagramComponent,
    GraphViewComponent
  ],
  imports: [
    GraphDisplayRoutingModule,
    CommonModule,
    FilterModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
  ],
  exports: [
    GraphViewComponent
  ],
  providers: [
    GraphService
  ]
})
export class GraphDisplayModule { }
