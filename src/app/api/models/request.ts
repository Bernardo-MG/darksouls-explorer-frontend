import { Pagination } from "./pagination"
import { Sort } from "./sort"

export interface Request<T> {
    pagination?: Pagination,
    sort?: Sort<T>,
    search?: any
}