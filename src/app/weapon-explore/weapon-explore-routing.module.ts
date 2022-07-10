import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeaponInfoViewComponent } from './views/weapon-info-view/weapon-info-view.component';
import { WeaponListViewComponent } from './views/weapon-list-view/weapon-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: WeaponListViewComponent },
            { path: ':id', component: WeaponInfoViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeaponExploreRoutingModule { }