import { Component, Input } from '@angular/core';
import { Problem } from '../../models/Problem';

@Component({
  selector: 'problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.sass']
})
export class ProblemListComponent {

  @Input() selection: Problem[] = [];

  constructor() { }

}
