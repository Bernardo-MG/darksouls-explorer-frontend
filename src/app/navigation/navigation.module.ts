import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavigationMenuComponent
  ],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    LayoutModule,
    RouterModule
  ],
  exports: [
    NavigationMenuComponent
  ]
})
export class NavigationModule { }
