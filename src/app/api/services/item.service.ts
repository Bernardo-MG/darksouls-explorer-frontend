import { Injectable } from '@angular/core';
import { Item } from '@app/models/Item';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private apollo: Apollo
  ) { }

  getItems(name: String): Observable<Item[]> {
    return this.apollo
      .watchQuery<Item[]>({
        query: gql`
          {
            item {
              name,
              description
            }
          }
        `,
      })
      .valueChanges.pipe(map((response: ApolloQueryResult<Item[]>) => { return response.data }));
  }

}
