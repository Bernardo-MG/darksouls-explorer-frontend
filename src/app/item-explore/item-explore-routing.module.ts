import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemInfoViewComponent } from './views/item-info-view/item-info-view.component';
import { ItemListViewComponent } from './views/item-list-view/item-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: ItemListViewComponent },
            { path: ':id', component: ItemInfoViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemExploreRoutingModule { }