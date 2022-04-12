import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RouteApiActuator {

    private path: string;

    constructor(
        private router: Router
    ) {
        this.path = this.router.url.split('?')[0];
    }

    public toPage(page: number): void {
        this.router.navigate([this.path], { queryParams: { page } });
    }

}