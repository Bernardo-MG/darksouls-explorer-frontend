import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphModule } from '@app/graph/graph.module';
import { ItemSourceGraphComponent } from './item-source-graph/item-source-graph.component';
import { WeaponStatsComponent } from './weapon-stats/weapon-stats.component';



@NgModule({
  declarations: [
    WeaponStatsComponent,
    ItemSourceGraphComponent
  ],
  imports: [
    CommonModule,
    GraphModule,
    FormsModule
  ],
  exports: [
    WeaponStatsComponent,
    ItemSourceGraphComponent
  ]
})
export class ItemGraphModule { }
