import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SelectionPage } from '@app/pagination/models/SelectionPage';
import { number } from 'echarts';

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

  rangeSize = 2;

  pages: SelectionPage[] = [];

  skipBefore: boolean = false;

  skipAfter: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    var start: number;
    var end: number;

    if ((this.currentPage + 1) <= this.rangeSize) {
      start = 0;
      end = this.rangeSize * 2;
    } else if (this.currentPage + this.rangeSize > this.totalPages) {
      start = this.totalPages - (this.rangeSize * 2);
      end = this.totalPages - 1;
    } else {
      start = this.currentPage - this.rangeSize;
      end = this.currentPage + this.rangeSize;
    }

    this.skipBefore = start > 0;
    this.skipAfter = end < this.totalPages;

    this.pages = [];
    for (var i = start; i <= end; i++) {
      this.pages.push({ number: i, selected: i == this.currentPage });
    }
  }

}
