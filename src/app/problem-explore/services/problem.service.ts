import { Injectable } from '@angular/core';
import { PaginationClient } from '@app/api/request/pagination-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Problem } from '../models/Problem';
import { Response } from '@app/api/models/response';

@Injectable()
export class ProblemService {

  private problemUrl = environment.apiUrl + "/problems";

  constructor(
    private client: PaginationClient
  ) { }

  getProblems(page: number): Observable<Response<Problem>> {
    return this.client.request(this.problemUrl).page(page).order('id', 'asc').get();
  }

}
