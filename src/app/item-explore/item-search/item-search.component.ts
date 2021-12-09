import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ItemSearch } from '../models/itemSearch';
import { ValueSelection } from '../models/valueSelection';

@Component({
  selector: 'item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.sass']
})
export class ItemSearchComponent implements OnInit, OnChanges {

  @Input() tags: string[] = [];

  @Output() search = new EventEmitter<ItemSearch>();

  selection: ValueSelection[] = [];

  name: string = '';

  constructor() { }

  ngOnInit(): void {
    this.selection = this.tags.map(this.toSelection);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selection = this.tags.map(this.toSelection);
  }

  applySearch() {
    const selectedTags = this.selection.filter((s) => s.selected).map((s) => s.value);
    this.search.emit({ name: this.name, tags: selectedTags });
  }

  private toSelection(tag: string): ValueSelection {
    return { value: tag, selected: false };
  }

}
