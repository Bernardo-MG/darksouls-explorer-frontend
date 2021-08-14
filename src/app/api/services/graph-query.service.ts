import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GraphResponse } from '@app/api/models/graphResponse';
import { InfoResponse } from '@app/api/models/infoResponse';
import { Graph } from '@app/api/models/graph';
import { Item } from '@app/api/models/item';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class GraphQueryService {

  constructor(
    private apollo: Apollo
  ) { }

  getGraph(relationships: String[]): Observable<Graph> {
    const relArg = relationships.map((v) => '"' + v + '"').join(',');
    return this.apollo
      .watchQuery<GraphResponse>({
        query: gql`
          {
            graph(type: [${relArg}]) {
              nodes {
                id,
                name
              },
              links {
                source,
                sourceId,
                target,
                targetId,
                type
              },
              types
            }
          }
        `,
      })
      .valueChanges.pipe(map((response: ApolloQueryResult<GraphResponse>) => { return response.data.graph }));
  }

  getAllTypes(): Observable<String[]> {
    return this.apollo
      .watchQuery<GraphResponse>({
        query: gql`
          {
            graph {
              types
            }
          }
        `,
      })
      .valueChanges.pipe(map((response: ApolloQueryResult<GraphResponse>) => { return response.data.graph.types }));
  }

  getOne(id: Number): Observable<Item> {
    return this.apollo
      .watchQuery<InfoResponse>({
        query: gql`
          {
            info(id: ${id}) {
              id
              name
              description
            }
          }
        `,
      })
      .valueChanges.pipe(map((response: ApolloQueryResult<InfoResponse>) => { return response.data.info }));
  }

}
