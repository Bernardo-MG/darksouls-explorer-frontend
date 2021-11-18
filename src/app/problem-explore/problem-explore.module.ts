import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { ProblemExploreRoutingModule } from './problem-explore-routing.module';
import { ProblemService } from './services/problem.service';



@NgModule({
  declarations: [
    ProblemViewComponent,
    ProblemListComponent
  ],
  imports: [
    ProblemExploreRoutingModule,
    CommonModule
  ],
  providers: [
    ProblemService
  ]
})
export class ProblemExploreModule { }
