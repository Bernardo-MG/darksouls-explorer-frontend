import { Router } from "@angular/router";
import { PageInfo } from "../models/page-info";
import { DefaultPaginator } from "./default-paginator";

export class RoutePaginator extends DefaultPaginator {

    public currentPage: number = 0;

    public totalPages: number = 0;

    public previousEnabled: boolean = false;

    public nextEnabled: boolean = false;

    private path: string;

    constructor(
        private router: Router
    ) {
        super();
        this.path = this.router.url.split('?')[0];
    }

    public setPagination(page: PageInfo): void {
        this.currentPage = page.pageNumber;
        this.totalPages = page.totalPages;

        this.previousEnabled = !page.first;
        this.nextEnabled = !page.last;
    }

    public toFirstPage(): void {
        this.toPage(0);
    }

    public toPreviousPage(): void {
        this.toPage(this.currentPage - 1);
    }

    public toNextPage(): void {
        this.toPage(this.currentPage + 1);
    }

    public toPage(page: number): void {
        this.router.navigate([this.path], { queryParams: { page } });
    }

}
