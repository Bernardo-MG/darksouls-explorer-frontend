export interface Paginator {

    get data(): any[];

    get previousEnabled(): boolean;
    
    get nextEnabled(): boolean;

    get totalPages(): number;
  
    get currentPage(): number;
    
    toFirstPage(): void;

    toPreviousPage(): void;

    toNextPage(): void;

    toPage(page: number): void;

}
