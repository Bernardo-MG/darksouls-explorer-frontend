import { RouteApiActuator } from "../actuator/route-api-actuator";
import { OrderController } from "./order-controller";

export class RouteOrderController extends OrderController {

    constructor(
        apiActuator: RouteApiActuator
    ) {
        super();

        this.sort.subscribe(s => apiActuator.setOrder(s));
    }
    
}