import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ItemGraphModule } from '@app/item-graph/item-graph.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeaponService } from './services/weapon.service';
import { WeaponInfoViewComponent } from './views/weapon-info-view/weapon-info-view.component';
import { WeaponListViewComponent } from './views/weapon-list-view/weapon-list-view.component';
import { ItemExploreModule } from '@app/item-explore/item-explore.module';
import { ItemModule } from '@app/item/item.module';
import { WeaponExploreRoutingModule } from './weapon-explore-routing.module';

@NgModule({
  declarations: [
    WeaponListViewComponent,
    WeaponInfoViewComponent
  ],
  imports: [
    WeaponExploreRoutingModule,
    ItemModule,
    CommonModule,
    ApiUiModule,
    FormsModule,
    ReactiveFormsModule,
    ItemGraphModule,
    FontAwesomeModule,
    ItemExploreModule
  ],
  providers: [
    WeaponService
  ]
})
export class WeaponExploreModule { }
