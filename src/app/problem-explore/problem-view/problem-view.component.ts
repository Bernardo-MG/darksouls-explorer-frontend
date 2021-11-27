import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../services/problem.service';
import { Paginator } from '@app/pagination/paginator/paginator';

@Component({
  selector: 'problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.sass']
})
export class ProblemViewComponent implements OnInit {

  paginator: Paginator = new Paginator((page) => this.service.getProblems(page));

  constructor(
    private service: ProblemService
  ) { }

  ngOnInit(): void {
    this.paginator.init();
  }

  previousPage() {
    this.paginator.previousPage();
  }

  nextPage() {
    this.paginator.nextPage();
  }

  toPage(page: number) {
    this.paginator.toPage(page);
  }

}
