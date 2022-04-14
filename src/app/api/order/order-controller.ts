import { ReplaySubject } from "rxjs";
import { Sort } from "../models/sort";

export class OrderController {

    public sort = new ReplaySubject<Sort<any>>();

    private sortValue: Sort<any> | undefined;

    public setSort(value: Sort<any>){
        this.sortValue = value;
        this.sort.next(value);
    }

    public sortAscending() {
        if (this.sortValue) {
            this.sortValue.order = "asc";
        }
    }

    public sortDescending() {
        if (this.sortValue) {
            this.sortValue.order = "desc";
        }
    }

}