import { Component, OnInit } from '@angular/core';
import { DatasourceBuilder } from '@app/api/datasource/handlers/datasource-builder';
import { RouteDatasource } from '@app/api/datasource/handlers/route-datasource';
import { DefaultPaginator } from '@app/api/pagination/handlers/default-paginator';
import { Paginator } from '@app/api/pagination/handlers/paginator';
import { Problem } from '@app/problem-explore/models/Problem';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.sass']
})
export class ProblemViewComponent implements OnInit {

  paginator: Paginator = new DefaultPaginator();

  datasource: RouteDatasource<Problem>;

  constructor(
    private service: ProblemService,
    datasourceBuilder: DatasourceBuilder
  ) {
    this.datasource = datasourceBuilder.build((page, search) => this.service.getProblems(page));
    this.paginator = this.datasource.paginator;
  }

  ngOnInit(): void {
    this.paginator.toFirstPage();
  }

}
