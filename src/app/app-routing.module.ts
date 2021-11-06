import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const graphModule = () => import('@app/graph-display/graph-display.module').then(m => m.GraphDisplayModule);
const itemModule = () => import('@app/item-explore/item-explore.module').then(m => m.ItemExploreModule);

const routes: Routes = [
  { path: '', redirectTo: '/graph', pathMatch: 'full' },
  { path: 'graph', loadChildren: graphModule },
  { path: 'items', loadChildren: itemModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
