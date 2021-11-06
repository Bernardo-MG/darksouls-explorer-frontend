import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NamedValue } from '@app/models/namedValue';
import { Info } from '../models/info';
import { Graph } from '../models/graph';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class GraphService {

  private graphUrl = environment.apiUrl + "/graph";
  private graphLinksUrl = environment.apiUrl + "/graph/links";


  constructor(
    private http: HttpClient
  ) { }

  getOptions(): Observable<NamedValue[]> {
    return this.getLinks().pipe(map((types) => types.map((type) => { return { name: type, value: type } as NamedValue })));
  }

  getInfo(id: Number): Observable<Info> {
    const url = this.graphUrl + `/${id}`
    return this.http.get<Info>(url).pipe(
      map((response: Info) => { return response }),
      catchError(this.handleError<Info>('getInfo', { id: '-1', label: '', description: [] }))
    ).pipe(
      catchError(this.handleError<Info>('getInfo', { id: '-1', label: '', description: [] }))
    );
  }

  getGraph(relationships: String[]): Observable<Graph> {
    const relArg = relationships.join(',');
    const params = { params: new HttpParams().set('links', relArg) };
    return this.http.get<Graph>(this.graphUrl, params).pipe(
      map((response: Graph) => { return response }),
      catchError(this.handleError<Graph>('getGraph', { nodes: [], links: [], types: [] }))
    ).pipe(
      catchError(this.handleError<Graph>('getGraph', { nodes: [], links: [], types: [] }))
    );
  }

  private getLinks(): Observable<String[]> {
    return this.http.get<String[]>(this.graphLinksUrl).pipe(
      map((response: String[]) => { return response }),
      catchError(this.handleError<String[]>('getLinks', []))
    ).pipe(
      catchError(this.handleError<String[]>('getLinks', []))
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
