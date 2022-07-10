import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { GraphModule } from '@app/graph/graph.module';
import { ItemExploreModule } from '@app/item-explore/item-explore.module';
import { ItemGraphModule } from '@app/item-graph/item-graph.module';
import { ItemModule } from '@app/item/item.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeaponInfoComponent } from './components/weapon-info/weapon-info.component';
import { WeaponPathSelectorComponent } from './components/weapon-path-selector/weapon-path-selector.component';
import { WeaponPathsComponent } from './components/weapon-paths/weapon-paths.component';
import { WeaponPathsService } from './services/weapon-paths.service';
import { WeaponService } from './services/weapon.service';
import { WeaponInfoViewComponent } from './views/weapon-info-view/weapon-info-view.component';
import { WeaponListViewComponent } from './views/weapon-list-view/weapon-list-view.component';
import { WeaponExploreRoutingModule } from './weapon-explore-routing.module';

@NgModule({
  declarations: [
    WeaponInfoComponent,
    WeaponListViewComponent,
    WeaponInfoViewComponent,
    WeaponPathSelectorComponent,
    WeaponPathsComponent
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
    ItemExploreModule,
    GraphModule
  ],
  providers: [
    WeaponService,
    WeaponPathsService
  ]
})
export class WeaponExploreModule { }
