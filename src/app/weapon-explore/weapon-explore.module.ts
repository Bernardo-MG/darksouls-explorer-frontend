import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponViewComponent } from './weapon-view/weapon-view.component';
import { WeaponExploreRoutingModule } from './weapon-explore-routing.module';
import { WeaponService } from './services/weapon.service';
import { WeaponListComponent } from './weapon-list/weapon-list.component';
import { PaginationModule } from '@app/pagination/pagination.module';
import { WeaponInfoComponent } from './weapon-info/weapon-info.component';
import { GraphModule } from '@app/graph/graph.module';
import { WeaponStatsComponent } from './weapon-stats/weapon-stats.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WeaponViewComponent,
    WeaponListComponent,
    WeaponInfoComponent,
    WeaponStatsComponent
  ],
  imports: [
    WeaponExploreRoutingModule,
    CommonModule,
    PaginationModule,
    GraphModule,
    FormsModule
  ],
  providers: [
    WeaponService
  ]
})
export class WeaponExploreModule { }
