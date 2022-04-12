import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultPaginationController } from '@app/api/pagination/default-pagination-controller';
import { PaginationController } from '@app/api/pagination/pagination-controller';
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

  paginator: PaginationController = new DefaultPaginationController();

  constructor(
    private service: ProblemService,
    router: Router
  ) {
    this.service.getProblems().subscribe(d => this.data = d);
    this.paginator = new RoutePaginationController(router);
  }

}
