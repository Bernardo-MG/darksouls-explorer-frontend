import { Injectable } from '@angular/core';
import { DatasourceBuilder } from '@app/api/datasource/handlers/datasource-builder';
import { RouteDatasource } from '@app/api/datasource/handlers/route-datasource';
import { Response } from '@app/api/models/response';
import { Paginator } from '@app/api/pagination/handlers/paginator';
import { RequestClient } from '@app/api/request/handlers/request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Problem } from '../models/Problem';
import { Request } from "@app/api/models/request";
import { Pagination } from '@app/api/models/pagination';

@Injectable()
export class ProblemService {

  private problemUrl = environment.apiUrl + "/problems";

  paginator: Paginator;

  datasource: RouteDatasource<Problem>;

  constructor(
    private client: RequestClient,
    datasourceBuilder: DatasourceBuilder
  ) {
    this.datasource = datasourceBuilder.build<Problem>((request: Request<Problem>) => this.requestProblems(request.pagination));
    this.paginator = this.datasource.paginator;
  }
  
  public getProblems(): Observable<Problem[]> {
    return this.datasource.data;
  }

  private requestProblems(pagination?: Pagination): Observable<Response<Problem[]>> {
    return this.client.get<Problem>(this.problemUrl).page(pagination).sort({ property: 'id', order: 'asc' }).fetch();
  }

}
