import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponViewComponent } from './weapon-view/weapon-view.component';
import { WeaponExploreRoutingModule } from './weapon-explore-routing.module';
import { WeaponService } from './services/weapon.service';

@NgModule({
  declarations: [
    WeaponViewComponent
  ],
  imports: [
    WeaponExploreRoutingModule,
    CommonModule
  ],
  providers: [
    WeaponService
  ]
})
export class WeaponExploreModule { }
