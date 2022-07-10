import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphModule } from '@app/graph/graph.module';
import { ArmorStatsComponent } from './armor-stats/armor-stats.component';
import { ItemSourceGraphComponent } from './item-source-graph/item-source-graph.component';

@NgModule({
  declarations: [
    ItemSourceGraphComponent,
    ArmorStatsComponent
  ],
  imports: [
    CommonModule,
    GraphModule,
    FormsModule
  ],
  exports: [
    ArmorStatsComponent,
    ItemSourceGraphComponent
  ]
})
export class ItemGraphModule { }
