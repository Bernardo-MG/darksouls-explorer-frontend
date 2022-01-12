import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { ProblemExploreRoutingModule } from './problem-explore-routing.module';
import { ProblemService } from './services/problem.service';
import { PaginationModule } from '@app/pagination/pagination.module';



@NgModule({
  declarations: [
    ProblemViewComponent,
    ProblemListComponent
  ],
  imports: [
    ProblemExploreRoutingModule,
    CommonModule,
    PaginationModule
  ],
  providers: [
    ProblemService
  ]
})
export class ProblemExploreModule { }
