import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Problem } from '../models/Problem';

@Injectable()
export class ProblemService {

  private problemUrl = environment.apiUrl + "/problems";

  constructor(
    private client: RequestClient
  ) { }

  getProblems(page: number): Observable<PaginatedResponse<Problem>> {
    return this.client.request(this.problemUrl).page(page).order('id', 'asc').get();
  }

}
