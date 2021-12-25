import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeaponViewComponent } from './weapon-view/weapon-view.component';


const routes: Routes = [
    {
        path: '', component: WeaponViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeaponExploreRoutingModule { }