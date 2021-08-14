import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphViewComponent } from './graph-display/graph-view/graph-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/relationships', pathMatch: 'full' },
  { path: 'relationships', component: GraphViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
