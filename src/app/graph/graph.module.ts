import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { GraphDiagramComponent } from './graph-diagram/graph-diagram.component';
import { FilterModule } from '@app/filter/filter.module';

@NgModule({
  declarations: [
    GraphDiagramComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
  ],
  exports: [
    GraphDiagramComponent
  ]
})
export class GraphModule { }
