import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Problem } from '../models/Problem';
import { SelectionPage } from '../../pagination/models/SelectionPage';

@Component({
  selector: 'problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.sass']
})
export class ProblemListComponent {

  @Input() selection: Problem[] = [];

  constructor() { }

}
