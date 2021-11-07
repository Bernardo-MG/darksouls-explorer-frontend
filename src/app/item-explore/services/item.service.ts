import { Injectable } from '@angular/core';
import { Item } from '@app/models/Item';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Response } from '@app/api/models/response';

@Injectable()
export class ItemService {

  private itemUrl = environment.apiUrl + "/items";

  constructor(
    private http: HttpClient
  ) { }

  getItems(page: number): Observable<Item[]> {
    const params = { params: new HttpParams().set('page', page) };
    return this.http.get<Response<Item>>(this.itemUrl, params).pipe(
      map((response: Response<Item>) => { return response.content }),
      catchError(this.handleError<Item[]>('getItems', []))
    ).pipe(
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
