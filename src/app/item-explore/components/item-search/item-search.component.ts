import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ItemSearch } from '@app/models/itemSearch';
import { ValueSelection } from '@app/models/valueSelection';


@Component({
  selector: 'item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.sass']
})
export class ItemSearchComponent implements OnChanges {

  @Input() tags: string[] = [];

  @Output() search = new EventEmitter<ItemSearch>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [""],
      tags: this.formBuilder.array([])
    });
  }

  get tagOptions(): FormArray {
    return <FormArray>this.form.get('tags');
  }

  ngOnChanges(): void {
    const selection = this.tags.map(this.toSelection);
    this.form = this.formBuilder.group({
      name: [""],
      tags: this.formBuilder.array(selection.map(s => this.toTagGroup(this.formBuilder, s)))
    });
  }

  applySearch() {
    const selectedTags = this.form.value.tags.filter((t: any) => t.selected).map((t: any) => t.name);
    const name = this.form.value.name;
    this.search.emit({ name, tags: selectedTags });
  }

  private toSelection(tag: string): ValueSelection {
    return { value: tag, selected: false };
  }

  private toTagGroup(fb: FormBuilder, selection: ValueSelection) {
    return fb.group({
      name: [selection.value],
      selected: [selection.selected]
    });
  }

}
