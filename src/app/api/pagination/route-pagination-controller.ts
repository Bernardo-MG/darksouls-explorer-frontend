import { Injectable } from "@angular/core";
import { RouteApiActuator } from "../actuator/route-api-actuator";
import { DefaultPaginationController } from "./default-pagination-controller";

@Injectable({
    providedIn: 'root'
})
export class RoutePaginationController extends DefaultPaginationController {

    constructor(
        apiActuator: RouteApiActuator
    ) {
        super();

        this.page.subscribe(p => apiActuator.setPage(p));
    }

}
