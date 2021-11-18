import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NamedValue } from '@app/models/namedValue';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent {

  @Output() applyFilter = new EventEmitter<any>();

  @Input() options: NamedValue[] = [];

  selections: string[] = [];

  constructor() { }

  onSelectOption(event: any, index: number) {
    this.selections[index] = event.target.value;
  }

  onAddSelection() {
    this.selections.push(this.options[0].value);
  }

  onRemoveSelection(index: number) {
    this.selections.splice(index, 1);
  }

  onApplyFilter() {
    this.applyFilter.emit(this.selections)
  }

}
