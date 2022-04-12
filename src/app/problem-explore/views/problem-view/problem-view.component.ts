import { Component } from '@angular/core';
import { RoutePaginationController } from '@app/api/pagination/route-pagination-controller';
import { Problem } from '@app/problem-explore/models/Problem';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.sass']
})
export class ProblemViewComponent {

  data: Problem[] = [];

  constructor(
    private service: ProblemService,
    public paginationController: RoutePaginationController
  ) {
    this.service.getProblems().subscribe(d => this.data = d);
    this.service.getProblemsPageInfo().subscribe(p => paginationController.setPagination(p));
  }

}
