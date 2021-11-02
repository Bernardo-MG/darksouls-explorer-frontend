import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphViewComponent } from './graph-view/graph-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: GraphViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GraphDisplayRoutingModule { }