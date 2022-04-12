import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemExploreRoutingModule } from './problem-explore-routing.module';
import { ProblemService } from './services/problem.service';
import { ProblemViewComponent } from './views/problem-view/problem-view.component';



@NgModule({
  declarations: [
    ProblemViewComponent,
    ProblemListComponent
  ],
  imports: [
    ProblemExploreRoutingModule,
    CommonModule,
    ApiUiModule
  ],
  providers: [
    ProblemService
  ]
})
export class ProblemExploreModule { }
