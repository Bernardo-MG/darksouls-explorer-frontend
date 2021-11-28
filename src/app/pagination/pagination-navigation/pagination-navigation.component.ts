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

  rangeSize = 2;

  pages: SelectionPage[] = [];

  skipBefore: boolean = false;

  skipAfter: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    var start: number;
    var end: number;
    const totalp = this.totalPages - 1;

    if ((this.currentPage + 1) <= this.rangeSize) {
      // Current page in the lower page window
      start = 0;
      end = this.rangeSize * 2;
      if (end > totalp) {
        end = totalp;
      }
    } else if (this.currentPage + this.rangeSize > totalp) {
      // Current page in the upper page window
      start = totalp - (this.rangeSize * 2);
      end = totalp;
    } else {
      start = this.currentPage - this.rangeSize;
      end = this.currentPage + this.rangeSize;
    }

    this.skipBefore = start > 0;
    this.skipAfter = end < totalp;

    this.pages = [];
    for (var i = start; i <= end; i++) {
      this.pages.push({ number: i, selected: i == this.currentPage });
    }
  }

}
