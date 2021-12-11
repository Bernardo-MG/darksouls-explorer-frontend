import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const graphModule = () => import('@app/graph-display/graph-display.module').then(m => m.GraphDisplayModule);
const itemModule = () => import('@app/item-explore/item-explore.module').then(m => m.ItemExploreModule);
const problemModule = () => import('@app/problem-explore/problem-explore.module').then(m => m.ProblemExploreModule);
const mapModule = () => import('@app/map/map.module').then(m => m.MapModule);

const routes: Routes = [
  { path: '', redirectTo: '/graph', pathMatch: 'full' },
  { path: 'graph', loadChildren: graphModule },
  { path: 'items', loadChildren: itemModule },
  { path: 'problems', loadChildren: problemModule },
  { path: 'maps', loadChildren: mapModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
