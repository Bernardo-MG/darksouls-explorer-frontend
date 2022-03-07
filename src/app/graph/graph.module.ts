import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { GraphDiagramComponent } from './graph-diagram/graph-diagram.component';
import { StackedChartComponent } from './stacked-chart/stacked-chart.component';

@NgModule({
  declarations: [
    GraphDiagramComponent,
    StackedChartComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
  ],
  exports: [
    GraphDiagramComponent,
    StackedChartComponent
  ]
})
export class GraphModule { }
