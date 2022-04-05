import { Component, OnInit } from '@angular/core';
import { DefaultPaginator } from '@app/pagination/paginator/default-paginator';
import { Paginator } from '@app/pagination/paginator/paginator';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.sass']
})
export class ProblemViewComponent implements OnInit {

  paginator: Paginator = new DefaultPaginator((page) => this.service.getProblems(page));

  constructor(
    private service: ProblemService
  ) { }

  ngOnInit(): void {
    this.paginator.toFirstPage();
  }

}
