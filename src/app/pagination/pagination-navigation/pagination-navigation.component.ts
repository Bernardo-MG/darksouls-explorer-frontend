import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SelectionPage } from '@app/pagination/models/SelectionPage';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent implements OnChanges {

  @Input() previousEnabled: boolean = false;

  @Input() nextEnabled: boolean = false;

  @Input() totalPages: number = 0;

  @Input() currentPage: number = 0;

  @Output() previousPage = new EventEmitter<number>();

  @Output() nextPage = new EventEmitter<number>();

  @Output() toPage = new EventEmitter<number>();

  rangeSize = 5;

  pages: SelectionPage[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = [];
    for (var i = 0; i < this.totalPages; i++) {
      this.pages.push({ number: i, selected: i == this.currentPage });
    }
  }

}
