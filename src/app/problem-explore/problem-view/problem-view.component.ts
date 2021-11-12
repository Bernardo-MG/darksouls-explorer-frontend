import { Component, OnInit } from '@angular/core';
import { Problem } from '../models/Problem';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.sass']
})
export class ProblemViewComponent implements OnInit {

  items: Problem[] = [];

  page: number = 0;

  constructor(
    private itemService: ProblemService
  ) { }

  ngOnInit(): void {
    this.itemService.getProblems(this.page).subscribe(data => this.items = data);
  }

  loadNextPage() {
    this.page += 1;
    this.itemService.getProblems(this.page).subscribe(data => this.items = this.items.concat(data));
  }

}
