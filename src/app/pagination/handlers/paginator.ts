import { PageInfo } from "../models/page-info";

export interface Paginator {

    get previousEnabled(): boolean;
  
    set previousEnabled(enabled: boolean);
    
    get nextEnabled(): boolean;
  
    set nextEnabled(enabled: boolean);

    get totalPages(): number;
  
    set totalPages(total: number);
  
    get currentPage(): number;
  
    set currentPage(page: number);

    setPagination(page: PageInfo): void;
    
    toFirstPage(): void;

    toPreviousPage(): void;

    toNextPage(): void;

    toPage(page: number): void;

}
