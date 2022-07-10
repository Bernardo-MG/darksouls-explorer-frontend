import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const itemModule = () => import('@app/item-explore/item-explore.module').then(m => m.ItemExploreModule);
const weaponModule = () => import('@app/weapon-explore/weapon-explore.module').then(m => m.WeaponExploreModule);
const mapModule = () => import('@app/map/map.module').then(m => m.MapModule);
const problemModule = () => import('@app/problem-explore/problem-explore.module').then(m => m.ProblemExploreModule);

const routes: Routes = [
  { path: '', redirectTo: '/weapons', pathMatch: 'full' },
  { path: 'items', loadChildren: itemModule },
  { path: 'weapons', loadChildren: weaponModule },
  { path: 'problems', loadChildren: problemModule },
  { path: 'maps', loadChildren: mapModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
