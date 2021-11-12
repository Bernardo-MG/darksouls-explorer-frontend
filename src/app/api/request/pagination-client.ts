import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class PaginationClient {

  constructor(
    private http: HttpClient
  ) { }

  request(url: string) {
    return new FluentClient(this.http, url);
  }

}

class FluentClient {

  params: { params?: HttpParams } = {};

  constructor(
    private http: HttpClient,
    private url: string
  ) { }

  page(page: number) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms.set('page', page);

    return this;
  }

  pageSize(size: number) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms.set('size', size);

    return this;
  }

  order(field: string, direction: string) {
    let prms: HttpParams;

    prms = this.getHttpParams();

    prms.append('sort', `${field},${direction}`);

    return this;
  }

  get<T>(): Observable<T[]> {
    return this.http.get<Response<T>>(this.url, this.params).pipe(
      map((response: Response<T>) => { return response.content })
    ).pipe(
      catchError(this.handleError<T[]>([]))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private getHttpParams() {
    let prms: HttpParams;

    if (this.params.params) {
      prms = this.params.params;
    } else {
      prms = new HttpParams();
      this.params = { params: prms };
    }

    return prms;
  }

}
