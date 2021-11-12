import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Problem } from '../models/Problem';

@Component({
  selector: 'problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.sass']
})
export class ProblemListComponent implements OnInit {

  @Input() selection: Problem[] = [];

  @Output() loadNextPage = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {
  }

}
