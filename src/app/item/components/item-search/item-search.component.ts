import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemSearch } from '@app/item/models/itemSearch';


@Component({
  selector: 'item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.sass']
})
export class ItemSearchComponent {

  @Output() search = new EventEmitter<ItemSearch>();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [""],
      selectors: this.formBuilder.group({
        weapon: new FormControl(false),
        shield: new FormControl(false),
        armor: new FormControl(false),
        spell: new FormControl(false),
        item: new FormControl(false)
      })
    });
  }

  get tagOptions(): FormArray {
    return <FormArray>this.form.get('tags');
  }

  applySearch() {
    this.search.emit(this.form.value);
  }

}
