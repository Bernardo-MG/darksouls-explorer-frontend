import { Observable } from "rxjs";
import { Response } from '@app/api/models/response';
import { SelectionPage } from "../models/SelectionPage";

export class Paginator {

    data: any[] = [];

    currentPage: number = 0;

    totalPages: number = 0;

    previousEnabled: boolean = false;
  
    nextEnabled: boolean = false;

    loader: (page: number) => Observable<Response<any>>;

    constructor(
        load: (page: number) => Observable<Response<any>>
    ) {
        this.loader = load;
    }

    init(): void {
        this.currentPage = 0;
        this.loader(this.currentPage).subscribe(response => this.loadData(response));
    }

    previousPage() {
        this.currentPage -= 1;
        this.loader(this.currentPage).subscribe(response => this.loadData(response));
    }

    nextPage() {
        this.currentPage += 1;
        this.loader(this.currentPage).subscribe(response => this.loadData(response));
    }

    toPage(page: number) {
        this.currentPage = page;
        this.loader(this.currentPage).subscribe(response => this.loadData(response));
    }

    private loadData(response: Response<any>){
      this.data = response.content;
      this.totalPages = response.totalPages;
  
      this.previousEnabled = !response.first;
      this.nextEnabled = !response.last;
    }

}
