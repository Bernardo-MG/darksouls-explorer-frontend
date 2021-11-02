import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemInfoComponent } from './item-explore/item-info/item-info.component';

const graphModule = () => import('@app/graph-display/graph-display.module').then(x => x.GraphDisplayModule);

const routes: Routes = [
  { path: '', redirectTo: '/relationships', pathMatch: 'full' },
  { path: 'relationships', loadChildren: graphModule },
  { path: 'items', component: ItemInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
