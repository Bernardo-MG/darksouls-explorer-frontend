import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/handlers/request-client';
import { Response } from '@app/api/request/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Problem } from '../models/Problem';

@Injectable()
export class ProblemService {

  private problemUrl = environment.apiUrl + "/problems";

  constructor(
    private client: RequestClient
  ) { }

  getProblems(page: number): Observable<Response<Problem>> {
    return this.client.get(this.problemUrl).page(page).orderAscendingBy('id').request();
  }

}
