import { Component } from '@angular/core';
import { DefaultPaginator } from '@app/api/pagination/handlers/default-paginator';
import { Paginator } from '@app/api/pagination/handlers/paginator';
import { Problem } from '@app/problem-explore/models/Problem';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.sass']
})
export class ProblemViewComponent {

  data: Problem[] = [];

  paginator: Paginator = new DefaultPaginator();

  constructor(
    private service: ProblemService
  ) {
    this.service.getProblems().subscribe(d => this.data = d);
    this.paginator = this.service.paginator;
  }

}
