export interface Paginator {

    get data(): any[];

    get previousEnabled(): boolean;
    
    get nextEnabled(): boolean;

    get totalPages(): number;
  
    get currentPage(): number;
    
    firstPage(): void;

    previousPage(): void;

    nextPage(): void;

    toPage(page: number): void;

}
