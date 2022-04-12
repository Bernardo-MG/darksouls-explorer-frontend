import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteDatasource } from '@app/api/datasource/route-datasource';
import { ApiRequest } from "@app/api/models/api-request";
import { ApiResponse } from '@app/api/models/api-response';
import { PageInfo } from '@app/api/models/page-info';
import { RequestClient } from '@app/api/request/handlers/request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Problem } from '../models/Problem';

@Injectable()
export class ProblemService {

  private problemUrl = environment.apiUrl + "/problems";

  datasource: RouteDatasource<Problem>;

  constructor(
    private client: RequestClient,
    route: ActivatedRoute
  ) {
    this.datasource = new RouteDatasource<Problem>(route, (request: ApiRequest<Problem>) => this.requestProblems(request));
  }
  
  public getProblems(): Observable<Problem[]> {
    return this.datasource.data;
  }
  
  public getProblemsPageInfo(): Observable<PageInfo> {
    return this.datasource.pageInfo;
  }

  private requestProblems(request: ApiRequest<Problem>): Observable<ApiResponse<Problem[]>> {
    return this.client.get<Problem>(this.problemUrl).page(request.pagination).sort({ property: 'id', order: 'asc' }).fetch();
  }

}
