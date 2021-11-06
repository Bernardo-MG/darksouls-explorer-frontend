import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemInfoComponent } from './item-info/item-info.component';


const routes: Routes = [
    {
        path: '', component: ItemInfoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemExploreRoutingModule { }