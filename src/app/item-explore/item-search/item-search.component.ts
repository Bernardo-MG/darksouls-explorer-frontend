import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ValueSelection } from '../models/valueSelection';

@Component({
  selector: 'item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.sass']
})
export class ItemSearchComponent implements OnInit, OnChanges {

  @Input() tags: string[] = [];

  @Output() search = new EventEmitter<string[]>();

  selection: ValueSelection[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.selection = this.tags.map(this.toSelection);
  }

  ngOnInit(): void {
    this.selection = this.tags.map(this.toSelection);
  }

  applySearch() {
    this.search.emit(this.selection.filter((s) => s.selected).map((s) => s.value));
  }

  private toSelection(tag: string): ValueSelection {
    return { value: tag, selected: false };
  }

}
