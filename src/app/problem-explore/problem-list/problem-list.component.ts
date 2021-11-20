import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Problem } from '../models/Problem';
import { SelectionPage } from '../models/SelectionPage';

@Component({
  selector: 'problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.sass']
})
export class ProblemListComponent {

  @Input() selection: Problem[] = [];

  @Input() pages: SelectionPage[] = [];

  @Input() previousEnabled: boolean = false;

  @Input() nextEnabled: boolean = false;
  
  @Output() previousPage = new EventEmitter<number>();

  @Output() nextPage = new EventEmitter<number>();
  
  @Output() toPage = new EventEmitter<number>();

  constructor() { }

}
