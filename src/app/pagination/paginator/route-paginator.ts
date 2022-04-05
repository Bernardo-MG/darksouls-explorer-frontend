import { Router } from "@angular/router";
import { Paginator } from "./paginator";

export class RoutePaginator implements Paginator {

    private path: string;

    constructor(
        private wrapped: Paginator,
        private router: Router
    ) {
        this.path = this.router.url.split('?')[0];
    }

    get data(): any[] {
        return this.wrapped.data;
    }

    get currentPage(): number {
        return this.wrapped.currentPage;
    }

    get previousEnabled(): boolean {
        return this.wrapped.previousEnabled;
    }

    get nextEnabled(): boolean {
        return this.wrapped.nextEnabled;
    }

    get totalPages(): number {
        return this.wrapped.totalPages;
    }

    public toFirstPage(): void {
        this.toPage(0);
    }

    public toPreviousPage(): void {
        this.toPage(this.wrapped.currentPage - 1);
    }

    public toNextPage(): void {
        this.toPage(this.wrapped.currentPage + 1);
    }

    public toPage(page: number): void {
        this.router.navigate([this.path], { queryParams: { page } });
    }

}
