import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphModule } from '@app/graph/graph.module';
import { ArmorStatsComponent } from './armor-stats/armor-stats.component';
import { ItemSourceGraphComponent } from './item-source-graph/item-source-graph.component';
import { WeaponPathComponent } from './weapon-path-chart/weapon-path-chart.component';
import { WeaponPathSelectorComponent } from './weapon-path-selector/weapon-path-selector.component';
import { WeaponPathsComponent } from './weapon-paths/weapon-paths.component';

@NgModule({
  declarations: [
    WeaponPathComponent,
    ItemSourceGraphComponent,
    ArmorStatsComponent,
    WeaponPathSelectorComponent,
    WeaponPathsComponent
  ],
  imports: [
    CommonModule,
    GraphModule,
    FormsModule
  ],
  exports: [
    WeaponPathsComponent,
    ArmorStatsComponent,
    ItemSourceGraphComponent
  ]
})
export class ItemGraphModule { }
