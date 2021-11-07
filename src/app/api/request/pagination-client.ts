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

  get<T>(url: string, page: number): Observable<T[]> {
    const params = { params: new HttpParams().set('page', page) };
    return this.http.get<Response<T>>(url, params).pipe(
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

}
