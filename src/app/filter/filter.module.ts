import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule { }
