import { PageInfo } from "../models/page-info";
import { Paginator } from "./paginator";

export class DefaultPaginator implements Paginator {

    public currentPage: number = 0;

    public totalPages: number = 0;

    public previousEnabled: boolean = false;

    public nextEnabled: boolean = false;

    constructor() { }

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

    public toPage(page: number): void {}

}
