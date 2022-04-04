import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response } from '../models/response';
import { AbstractClient } from './abstract-request-client';

@Injectable({
  providedIn: 'root'
})
export class RequestClient extends AbstractClient {
  
  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  get<T>(): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.url, this.params).pipe(
      map((response: Response<T>) => { return response })
    ).pipe(
      catchError(this.handleErrorPaged())
    );
  }

}
