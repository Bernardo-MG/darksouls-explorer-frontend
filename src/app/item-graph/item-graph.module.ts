import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphModule } from '@app/graph/graph.module';
import { ItemSourceGraphComponent } from './item-source-graph/item-source-graph.component';
import { WeaponPathComponent } from './weapon-path/weapon-path.component';
import { ArmorStatsComponent } from './armor-stats/armor-stats.component';
import { WeaponPathDamageComponent } from './weapon-path-damage/weapon-path-damage.component';
import { WeaponPathDefenseComponent } from './weapon-path-defense/weapon-path-defense.component';
import { WeaponPathSelectorComponent } from './weapon-path-selector/weapon-path-selector.component';

@NgModule({
  declarations: [
    WeaponPathComponent,
    ItemSourceGraphComponent,
    ArmorStatsComponent,
    WeaponPathDamageComponent,
    WeaponPathDefenseComponent,
    WeaponPathSelectorComponent
  ],
  imports: [
    CommonModule,
    GraphModule,
    FormsModule
  ],
  exports: [
    WeaponPathDamageComponent,
    WeaponPathDefenseComponent,
    ArmorStatsComponent,
    ItemSourceGraphComponent
  ]
})
export class ItemGraphModule { }
