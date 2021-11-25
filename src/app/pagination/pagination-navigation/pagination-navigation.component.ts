import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Problem } from '@app/problem-explore/models/Problem';
import { SelectionPage } from '@app/pagination/models/SelectionPage';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent implements OnInit {

  @Input() pages: SelectionPage[] = [];

  @Input() previousEnabled: boolean = false;

  @Input() nextEnabled: boolean = false;
  
  @Output() previousPage = new EventEmitter<number>();

  @Output() nextPage = new EventEmitter<number>();
  
  @Output() toPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
