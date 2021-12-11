import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const itemModule = () => import('@app/item-explore/item-explore.module').then(m => m.ItemExploreModule);
const problemModule = () => import('@app/problem-explore/problem-explore.module').then(m => m.ProblemExploreModule);
const mapModule = () => import('@app/map/map.module').then(m => m.MapModule);

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', loadChildren: itemModule },
  { path: 'problems', loadChildren: problemModule },
  { path: 'maps', loadChildren: mapModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
