import { Component, OnInit } from '@angular/core';
import { DefaultPaginator } from '@app/api/pagination/handlers/default-paginator';
import { Paginator } from '@app/api/pagination/handlers/paginator';
import { Problem } from '../models/Problem';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.sass']
})
export class ProblemViewComponent implements OnInit {

  data: Problem[] = [];

  paginator: Paginator = new DefaultPaginator();

  constructor(
    private service: ProblemService
  ) { }

  ngOnInit(): void {
    this.paginator.toFirstPage();
  }

}
