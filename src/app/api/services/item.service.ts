import { Injectable } from '@angular/core';
import { Item } from '@app/models/Item';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemUrl = environment.apiUrl + "/items";

  constructor(
    private http: HttpClient
  ) { }

  getItems(name: String): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl).pipe(
      map((response: Item[]) => { return response }),
      catchError(this.handleError<Item[]>('getLinks', []))
    ).pipe(
      catchError(this.handleError<Item[]>('getLinks', []))
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
