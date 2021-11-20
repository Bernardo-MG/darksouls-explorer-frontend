import { Component, OnInit } from '@angular/core';
import { Problem } from '../models/Problem';
import { ProblemService } from '../services/problem.service';
import { Response } from '@app/api/models/response';
import { SelectionPage } from '../models/SelectionPage';

@Component({
  selector: 'problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.sass']
})
export class ProblemViewComponent implements OnInit {

  items: Problem[] = [];

  pages: SelectionPage[] = [];

  previousEnabled: boolean = false;

  nextEnabled: boolean = false;

  currentPage: number = 0;

  constructor(
    private itemService: ProblemService
  ) { }

  ngOnInit(): void {
    this.itemService.getProblems(this.currentPage).subscribe(response => this.loadData(response));
  }

  previousPage() {
    this.currentPage -= 1;
    this.itemService.getProblems(this.currentPage).subscribe(response => this.loadData(response));
  }

  nextPage() {
    this.currentPage += 1;
    this.itemService.getProblems(this.currentPage).subscribe(response => this.loadData(response));
  }

  toPage(page: number) {
    this.currentPage = page;
    this.itemService.getProblems(this.currentPage).subscribe(response => this.loadData(response));
  }

  private loadData(data: Response<Problem>){
    this.items = data.content;

    this.previousEnabled = !data.first;
    this.nextEnabled = !data.last;

    this.pages = [];
    for(var i = 0; i < data.totalPages; i++){
      this.pages.push({number: i, selected: i==this.currentPage});
    }
  }

}
