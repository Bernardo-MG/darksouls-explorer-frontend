import { PaginatedResponse } from '@app/api/request/models/paginated-response';
import { of } from 'rxjs';
import { DefaultPaginator } from './default-paginator';

describe('Paginator', () => {
  it('should create an instance', () => {
    expect(new DefaultPaginator((number) => of(new PaginatedResponse(undefined)))).toBeTruthy();
  });
});
