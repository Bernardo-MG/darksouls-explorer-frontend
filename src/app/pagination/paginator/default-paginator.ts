import { PaginatedResponse } from "@app/api/models/paginated-response";
import { Observable } from "rxjs";
import { Paginator } from "./paginator";

export class DefaultPaginator implements Paginator {

    _data: any[] = [];

    _currentPage: number = 0;

    _totalPages: number = 0;

    _previousEnabled: boolean = false;
  
    _nextEnabled: boolean = false;

    loader: (page: number) => Observable<PaginatedResponse<any>>;

    constructor(
        load: (page: number) => Observable<PaginatedResponse<any>>
    ) {
        this.loader = load;
    }

    get data(): any[] {
        return this._data;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    get totalPages(): number {
        return this._totalPages;
    }

    get previousEnabled(): boolean {
        return this._previousEnabled;
    }

    get nextEnabled(): boolean {
        return this._nextEnabled;
    }

    public firstPage(): void {
        this.toPage(0);
    }

    public previousPage(): void {
        this.toPage(this._currentPage - 1);
    }

    public nextPage(): void {
        this.toPage(this._currentPage + 1);
    }

    public toPage(page: number): void {
        this.loader(page).subscribe(response => this.loadData(response));
    }

    private loadData(response: PaginatedResponse<any>){
      this._currentPage = response.pageNumber;
      this._data = response.content;
      this._totalPages = response.totalPages;
  
      this._previousEnabled = !response.first;
      this._nextEnabled = !response.last;
    }

}
