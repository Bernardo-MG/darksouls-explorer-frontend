import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponViewComponent } from './weapon-view/weapon-view.component';
import { WeaponExploreRoutingModule } from './weapon-explore-routing.module';



@NgModule({
  declarations: [
    WeaponViewComponent
  ],
  imports: [
    WeaponExploreRoutingModule,
    CommonModule
  ]
})
export class WeaponExploreModule { }
