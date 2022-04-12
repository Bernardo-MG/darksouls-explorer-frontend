import { Router } from "@angular/router";
import { DefaultPaginationController } from "./default-pagination-controller";

export class RoutePaginationController extends DefaultPaginationController {

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
