import { Router } from "@angular/router";
import { DefaultPaginator } from "./default-paginator";

export class RoutePaginator extends DefaultPaginator {

    private path: string;

    constructor(
        private router: Router
    ) {
        super();

        this.path = this.router.url.split('?')[0];
    }

    public toPage(page: number): void {
        this.router.navigate([this.path], { queryParams: { page } });
    }

}
